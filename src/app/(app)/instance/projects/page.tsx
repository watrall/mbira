import { DataTable } from "@/components/ui";

const projects = [
  { id: "demo", name: "Demo Project", status: "Published", updated: "Oct 27, 2024" },
  { id: "archival", name: "Archival Stories", status: "Draft", updated: "Oct 12, 2024" },
];

export default function InstanceProjectsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Projects</h1>
        <p className="text-body text-textSecondary">
          Manage every project associated with this instance. Published items are available to
          project admins and authors based on role assignments.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "name", header: "Project" },
          { key: "status", header: "Status" },
          { key: "updated", header: "Last Updated" },
        ]}
        data={projects}
        getRowId={(row) => row.id}
        emptyState="No projects yet. Create the first project to begin authoring."
      />
    </section>
  );
}
