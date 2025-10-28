import { DataTable } from "@/components/ui";

const exhibits = [
  { id: "ex-1", title: "Caravan Routes", status: "Draft", owner: "Diego Morales" },
  { id: "ex-2", title: "Music of the Market", status: "Published", owner: "Samira Patel" },
];

export default function ProjectExhibitsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-header font-semibold text-textPrimary">Exhibits</h2>
        <p className="text-body text-textSecondary">
          Exhibits combine narrative content, media, and location context before publication.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "title", header: "Title" },
          { key: "owner", header: "Owner" },
          { key: "status", header: "Status" },
        ]}
        data={exhibits}
        getRowId={(row) => row.id}
        emptyState="Create your first exhibit to begin planning the visitor journey."
      />
    </section>
  );
}
