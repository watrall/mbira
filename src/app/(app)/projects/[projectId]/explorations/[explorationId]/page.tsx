"use client";

import type { FormEvent } from "react";
import { useRef, useState } from "react";

import { FormField, StickySaveBar, UnsavedIndicator } from "@/components/ui";

export default function ExplorationEditorPage({
  params,
}: {
  params: { projectId: string; explorationId: string };
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
          <h1 className="text-header font-semibold text-textPrimary">Edit Exploration</h1>
          <p className="text-caption text-textSecondary">Project {params.projectId}</p>
        </div>
        <UnsavedIndicator active={dirty} />
      </header>

      <div className="space-y-4 rounded-xl border border-borderDivider bg-white p-6 shadow-sm">
        <FormField id="title" label="Title" required>
          <input
            id="title"
            name="title"
            defaultValue="Audio Walk"
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body"
          />
        </FormField>
        <FormField id="summary" label="Summary">
          <textarea
            id="summary"
            name="summary"
            rows={3}
            defaultValue="A narrated walk through the historical marketplace."
            onChange={() => setDirty(true)}
            className="w-full rounded-md border border-borderDivider bg-white px-3 py-2 text-body"
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
