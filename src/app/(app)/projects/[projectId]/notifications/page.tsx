import { DataTable } from "@/components/ui";

const notifications = [
  { id: "1", title: "Exhibit ready for review", status: "Unread", created: "Oct 19" },
  { id: "2", title: "Comment added to Caravan Routes", status: "Read", created: "Oct 18" },
];

export default function ProjectNotificationsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-header font-semibold text-textPrimary">Project Notifications</h2>
        <p className="text-body text-textSecondary">
          Alerts scoped to this project appear here and in the command palette.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "title", header: "Notification" },
          { key: "status", header: "Status" },
          { key: "created", header: "Created" },
        ]}
        data={notifications}
        getRowId={(row) => row.id}
        emptyState="No project notifications."
      />
    </section>
  );
}
