"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { FormField, StickySaveBar, ToggleSwitch, UnsavedIndicator } from "@/components/ui";

export default function ExhibitEditorPage({
  params,
}: {
  params: { projectId: string; exhibitId: string };
}) {
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSaving(false);
    setDirty(false);
  };

  return (
    <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-header font-semibold text-textPrimary">Edit Exhibit</h1>
          <p className="text-caption text-textSecondary">Project {params.projectId}</p>
        </div>
        <UnsavedIndicator active={dirty} />
      </header>

      <div className="grid gap-4 rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
        <FormField id="title" label="Title" required>
          <input
            id="title"
            name="title"
            defaultValue="Caravan Routes"
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField id="synopsis" label="Synopsis">
          <textarea
            id="synopsis"
            name="synopsis"
            rows={4}
            defaultValue="Storytelling about historical trading paths."
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField
          id="featured"
          label="Featured"
          description="Highlight this exhibit on project dashboards."
        >
          <ToggleSwitch checked={false} onChange={() => setDirty(true)} label="Featured" />
        </FormField>
      </div>

      <StickySaveBar
        dirty={dirty}
        saving={saving}
        onSave={() => formRef.current?.requestSubmit()}
        onDiscard={() => setDirty(false)}
      />
    </form>
  );
}
