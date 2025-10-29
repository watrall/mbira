"use client";

import { useState } from "react";

import { Button, FormField, ToggleSwitch } from "@/components/ui";

export default function InstanceGeneralSettingsPage() {
  const [autoArchive, setAutoArchive] = useState(true);

  return (
    <form className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Instance Settings · General</h1>
        <p className="text-body text-textSecondary">
          Configure high-level defaults for project creation and public visibility.
        </p>
      </header>

      <div className="space-y-4 rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
        <FormField
          id="instance-name"
          label="Instance name"
          description="Visible across the authoring workspace."
          required
        >
          <input
            id="instance-name"
            name="instance-name"
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
            defaultValue="Mbira Museum Collective"
          />
        </FormField>
        <FormField
          id="auto-archive"
          label="Auto-archive published items"
          description="Automatically archive entries that have been unpublished for more than 180 days."
        >
          <ToggleSwitch checked={autoArchive} onChange={setAutoArchive} label="Auto-archive" />
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
