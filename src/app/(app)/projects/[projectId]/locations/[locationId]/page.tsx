"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { FormField, StickySaveBar, UnsavedIndicator } from "@/components/ui";

export default function LocationEditorPage({
  params,
}: {
  params: { projectId: string; locationId: string };
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
          <h1 className="text-header font-semibold text-textPrimary">Edit Location</h1>
          <p className="text-caption text-textSecondary">Project {params.projectId}</p>
        </div>
        <UnsavedIndicator active={dirty} />
      </header>

      <div className="grid gap-4 rounded-xl border border-borderDivider bg-white p-6 shadow-sm md:grid-cols-2">
        <FormField id="title" label="Title" required>
          <input
            id="title"
            name="title"
            defaultValue="Old Market Square"
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField id="slug" label="Slug" description="Used in URLs">
          <input
            id="slug"
            name="slug"
            defaultValue="old-market-square"
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
          />
        </FormField>
        <FormField id="summary" label="Summary" className="md:col-span-2">
          <textarea
            id="summary"
            name="summary"
            rows={4}
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body text-textPrimary"
            defaultValue="Historic marketplace established in 1874."
          />
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
