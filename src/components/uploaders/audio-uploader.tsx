"use client";

import { Button } from "@/components/ui";
import { AUDIO_MIME_TYPES } from "@/lib/uploaders/accepted-mime";

import { useFileUploader } from "./use-file-uploader";

export interface AudioUploaderProps {
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

export function AudioUploader({
  label = "Upload audio",
  description = "MP3, WAV, OGG, WEBM, FLAC up to 40 MB",
  maxSizeMB = 40,
  initialUrl,
  onUploaded,
  onRemoved,
}: AudioUploaderProps) {
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
    acceptedMimeTypes: AUDIO_MIME_TYPES,
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

      <div className="rounded-lg border border-borderDivider bg-bgSidebar/70 p-4">
        {previewUrl ? (
          <audio controls className="w-full" src={previewUrl} data-testid="audio-preview">
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className="flex h-20 items-center justify-center text-caption text-textSecondary">
            No audio selected
          </div>
        )}

        <div
          {...dropzone.getRootProps({
            className: `mt-4 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-borderDivider bg-white p-4 text-center transition hover:border-accent ${dropzone.isDragActive ? "border-accent bg-accent/10" : ""}`,
            "data-testid": "audio-dropzone",
          })}
        >
          <input data-testid="audio-input" {...dropzone.getInputProps()} />
          <p className="text-body font-semibold text-textPrimary">Drag & drop audio or browse</p>
          <p className="text-caption text-textSecondary">Supports {AUDIO_MIME_TYPES.join(", ")}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={openFileDialog} type="button" disabled={isDisabled}>
            {previewUrl ? "Replace" : "Select audio"}
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
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}

        {fileName ? <p className="mt-2 text-caption text-textSecondary">{fileName}</p> : null}
        {error ? <p className="mt-2 text-caption text-systemDanger">{error}</p> : null}
      </div>
    </div>
  );
}
