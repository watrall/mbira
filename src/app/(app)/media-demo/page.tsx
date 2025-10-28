"use client";

import { AudioUploader, ImageUploader, UploadProvider } from "@/components/uploaders";

export default function MediaDemoPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-page-title text-textPrimary">Media Upload Sandbox</h1>
        <p className="max-w-2xl text-body text-textSecondary">
          This demo exercises the reusable media uploaders. Files are uploaded to the configured
          Supabase buckets and return signed URLs for protected access.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        <UploadProvider value={{ bucket: "images", pathPrefix: "demo/images" }}>
          <section className="rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
            <ImageUploader />
          </section>
        </UploadProvider>

        <UploadProvider value={{ bucket: "audio", pathPrefix: "demo/audio" }}>
          <section className="rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
            <AudioUploader />
          </section>
        </UploadProvider>
      </div>
    </div>
  );
}
