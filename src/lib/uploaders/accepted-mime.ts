export const IMAGE_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"] as const;

export const AUDIO_MIME_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/flac",
] as const;

export type AcceptedImageMime = (typeof IMAGE_MIME_TYPES)[number];
export type AcceptedAudioMime = (typeof AUDIO_MIME_TYPES)[number];
