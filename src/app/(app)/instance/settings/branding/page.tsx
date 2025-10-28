"use client";

import { Button } from "@/components/ui";
import { ImageUploader, UploadProvider } from "@/components/uploaders";

export default function InstanceBrandingSettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Instance Settings · Branding</h1>
        <p className="text-body text-textSecondary">
          Upload logos and imagery used across login, navigation, and visitor endpoints.
        </p>
      </header>

      <UploadProvider value={{ bucket: "images", pathPrefix: "branding" }}>
        <ImageUploader label="Primary logo" description="Square PNG or SVG recommended" />
      </UploadProvider>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="button">Save branding</Button>
      </div>
    </div>
  );
}
