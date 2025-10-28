"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import slugify from "slugify";

import type { AcceptedAudioMime, AcceptedImageMime } from "@/lib/uploaders/accepted-mime";
import { createStorageClient } from "@/lib/uploaders/storage";
import { useAppStore, selectActions, selectSession } from "@/store/app-store";

import { useUploadContext } from "./upload-context";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UseFileUploaderOptions {
  acceptedMimeTypes: readonly (AcceptedImageMime | AcceptedAudioMime)[];
  maxSizeMB: number;
  onUploaded?: (payload: {
    path: string;
    signedUrl: string | null;
    filename: string;
    mimeType: string;
  }) => void;
  onRemoved?: () => void;
  initialUrl?: string | null;
}

export function useFileUploader({
  acceptedMimeTypes,
  maxSizeMB,
  onUploaded,
  onRemoved,
  initialUrl = null,
}: UseFileUploaderOptions) {
  const { bucket, pathPrefix } = useUploadContext();
  const session = useAppStore(selectSession);
  const { pushToast, dismissToast } = useAppStore(selectActions);

  const [previewUrl, setPreviewUrl] = useState<string | null>(initialUrl);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>(initialUrl ? "success" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    },
    [],
  );

  const [storageClient, setStorageClient] = useState<ReturnType<typeof createStorageClient> | null>(
    null,
  );
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const client = createStorageClient(session?.access_token ?? undefined);
      setStorageClient(client);
      setConfigError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Supabase configuration missing.";
      setStorageClient(null);
      setConfigError(message);
      setError(message);
    }
  }, [session?.access_token]);

  const startFakeProgress = useCallback(() => {
    setProgress(15);
    const interval = setInterval(() => {
      setProgress((current) => (current >= 90 ? current : current + 10));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const resetState = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreviewUrl(null);
    setStoragePath(null);
    setFileName(null);
    setStatus("idle");
    setProgress(0);
    setError(null);
  }, []);

  const handleRemove = useCallback(async () => {
    if (!storageClient) {
      return;
    }
    if (storagePath) {
      await storageClient.storage.from(bucket).remove([storagePath]);
    }
    resetState();
    onRemoved?.();
    pushToast({
      id: `upload-removed-${Date.now()}`,
      variant: "neutral",
      title: "File removed",
      description: "The asset has been removed from storage.",
      autoDismiss: true,
    });
  }, [storagePath, storageClient, bucket, resetState, onRemoved, pushToast]);

  const uploadFile = useCallback(
    async (file: File) => {
      const path = [
        pathPrefix,
        `${Date.now()}-${slugify(file.name, { lower: true, strict: true })}`,
      ]
        .filter(Boolean)
        .join("/");

      const stopProgress = startFakeProgress();
      setStatus("uploading");
      setError(null);

      const toastId = `upload-${path}`;
      pushToast({
        id: toastId,
        variant: "neutral",
        title: "Uploading",
        description: `Uploading ${file.name}…`,
        autoDismiss: false,
      });

      if (!storageClient) {
        setError(configError ?? "Uploads are temporarily unavailable.");
        setStatus("error");
        return;
      }

      const { error: uploadError } = await storageClient.storage.from(bucket).upload(path, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type,
      });

      stopProgress();
      dismissToast(toastId);

      if (uploadError) {
        setStatus("error");
        setError(uploadError.message ?? "Failed to upload file.");
        pushToast({
          id: `${toastId}-error`,
          variant: "danger",
          title: "Upload failed",
          description: uploadError.message,
        });
        return;
      }

      const { data: signed } = await storageClient.storage
        .from(bucket)
        .createSignedUrl(path, 60 * 60);

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }

      setPreviewUrl(signed?.signedUrl ?? null);
      setStoragePath(path);
      setFileName(file.name);
      setProgress(100);
      setStatus("success");

      onUploaded?.({
        path,
        signedUrl: signed?.signedUrl ?? null,
        filename: file.name,
        mimeType: file.type,
      });
      pushToast({
        id: `${toastId}-success`,
        variant: "success",
        title: "Upload complete",
        description: `${file.name} is ready to use.`,
      });
    },
    [
      storageClient,
      bucket,
      pathPrefix,
      startFakeProgress,
      pushToast,
      dismissToast,
      onUploaded,
      configError,
    ],
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const [file] = acceptedFiles;
      if (!file) return;

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      objectUrlRef.current = URL.createObjectURL(file);
      setPreviewUrl(objectUrlRef.current);
      setFileName(file.name);
      await uploadFile(file);
    },
    [uploadFile],
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      const [{ errors }] = fileRejections;
      const message = errors?.[0]?.message ?? "File rejected.";
      setError(message);
      setStatus("error");
      pushToast({
        id: `upload-rejected-${Date.now()}`,
        variant: "danger",
        title: "File rejected",
        description: message,
      });
    },
    [pushToast],
  );

  const accept = useMemo(() => {
    return acceptedMimeTypes.reduce<Record<string, string[]>>((acc, type) => {
      acc[type] = [];
      return acc;
    }, {});
  }, [acceptedMimeTypes]);

  const dropzone = useDropzone({
    multiple: false,
    accept,
    onDrop,
    onDropRejected,
    maxSize: maxSizeMB * 1024 * 1024,
    noClick: true,
    disabled: !storageClient,
  });

  return {
    dropzone,
    previewUrl,
    fileName,
    status,
    error: error ?? configError,
    progress,
    remove: handleRemove,
    openFileDialog: dropzone.open,
    isDisabled: !storageClient,
  } as const;
}
