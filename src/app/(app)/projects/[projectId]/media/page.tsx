import { AudioUploader, ImageUploader, UploadProvider } from "@/components/uploaders";

export default function ProjectMediaPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <UploadProvider value={{ bucket: "images", pathPrefix: "projects/demo" }}>
        <div className="rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
          <ImageUploader
            label="Project imagery"
            description="Upload hero imagery and inline photos."
          />
        </div>
      </UploadProvider>

      <UploadProvider value={{ bucket: "audio", pathPrefix: "projects/demo" }}>
        <div className="rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
          <AudioUploader label="Narration" description="MP3, WAV, WEBM up to 40 MB." />
        </div>
      </UploadProvider>
    </div>
  );
}
