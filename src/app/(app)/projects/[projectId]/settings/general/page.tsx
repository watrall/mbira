"use client";

import { useState } from "react";

import { Button, FormField, ToggleSwitch } from "@/components/ui";

export default function ProjectSettingsGeneralPage() {
  const [publicVisibility, setPublicVisibility] = useState(true);

  return (
    <form className="space-y-6">
      <div className="space-y-4 rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
        <FormField id="project-name" label="Project name" required>
          <input
            id="project-name"
            name="project-name"
            defaultValue="Demo Project"
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField id="project-summary" label="Summary">
          <textarea
            id="project-summary"
            name="project-summary"
            rows={3}
            defaultValue="A living archive of marketplace stories."
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField
          id="project-public"
          label="Public visibility"
          description="Allow this project to surface on visitor endpoints once published."
        >
          <ToggleSwitch
            checked={publicVisibility}
            onChange={setPublicVisibility}
            label="Public visibility"
          />
        </FormField>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" type="button">
          Cancel
        </Button>
        <Button type="submit">Save settings</Button>
      </div>
    </form>
  );
}
