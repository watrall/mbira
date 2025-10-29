"use client";

import Image from "next/image";

import { Button } from "@/components/ui";
import { IMAGE_MIME_TYPES } from "@/lib/uploaders/accepted-mime";

import { useFileUploader } from "./use-file-uploader";

export interface ImageUploaderProps {
  label?: string;
  description?: string;
  maxSizeMB?: number;
  initialUrl?: string | null;
  onUploaded?: (payload: {
    path: string;
    signedUrl: string | null;
    filename: string;
    mimeType: string;
  }) => void;
  onRemoved?: () => void;
}

export function ImageUploader({
  label = "Upload image",
  description = "JPEG, PNG, WEBP, SVG up to 10 MB",
  maxSizeMB = 10,
  initialUrl,
  onUploaded,
  onRemoved,
}: ImageUploaderProps) {
  const {
    dropzone,
    previewUrl,
    fileName,
    status,
    error,
    progress,
    remove,
    openFileDialog,
    isDisabled,
  } = useFileUploader({
    acceptedMimeTypes: IMAGE_MIME_TYPES,
    maxSizeMB,
    initialUrl,
    onUploaded,
    onRemoved,
  });

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <p className="text-body font-medium text-textPrimary">{label}</p>
        <p className="text-caption text-textSecondary">{description}</p>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex size-32 items-center justify-center overflow-hidden rounded-lg border border-borderDivider bg-bgSidebar">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt={fileName ?? "Preview"}
              width={128}
              height={128}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-caption text-textSecondary">No image</span>
          )}
        </div>

        <div className="flex-1">
          <div
            {...dropzone.getRootProps({
              className: `flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-borderDivider bg-bgSidebar/80 p-4 text-center transition hover:border-accent-strong ${
                dropzone.isDragActive ? "border-accent-strong bg-accent-surface" : ""
              }`,
              "data-testid": "image-dropzone",
            })}
          >
            <input data-testid="image-input" {...dropzone.getInputProps()} />
            <p className="text-body font-semibold text-textPrimary">Drop image here or browse</p>
            <p className="text-caption text-textSecondary">
              Supports {IMAGE_MIME_TYPES.join(", ")}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={openFileDialog}
              type="button"
              disabled={isDisabled}
            >
              {previewUrl ? "Replace" : "Select image"}
            </Button>
            {previewUrl ? (
              <Button variant="ghost" onClick={remove} type="button" disabled={isDisabled}>
                Remove
              </Button>
            ) : null}
          </div>

          {status === "uploading" ? (
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-borderDivider">
              <div
                className="h-full rounded-full bg-accent-strong transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          ) : null}

          {fileName ? <p className="mt-2 text-caption text-textSecondary">{fileName}</p> : null}
          {error ? <p className="mt-2 text-caption text-systemDanger">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
