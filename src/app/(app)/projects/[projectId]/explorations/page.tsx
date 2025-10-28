import { DataTable } from "@/components/ui";

const explorations = [
  { id: "exp-1", title: "Audio Walk", status: "Draft", steps: 8 },
  { id: "exp-2", title: "Curator's Picks", status: "Published", steps: 5 },
];

export default function ProjectExplorationsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-header font-semibold text-textPrimary">Explorations</h2>
        <p className="text-body text-textSecondary">
          Explorations chain locations, exhibits, and media for guided experiences.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "title", header: "Title" },
          { key: "steps", header: "Steps" },
          { key: "status", header: "Status" },
        ]}
        data={explorations}
        getRowId={(row) => row.id}
        emptyState="Design your first exploration to guide visitors."
      />
    </section>
  );
}
