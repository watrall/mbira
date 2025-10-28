import { DataTable } from "@/components/ui";

const notifications = [
  { id: "1", title: "New exhibit awaiting review", audience: "Project Admins", created: "Oct 20" },
  { id: "2", title: "Integration token expiring", audience: "Instance Admins", created: "Oct 18" },
];

export default function InstanceNotificationsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Notifications</h1>
        <p className="text-body text-textSecondary">
          Configure alerts for system events and editorial workflows. Notifications surface in the
          top bar and via email based on user preferences.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "title", header: "Notification" },
          { key: "audience", header: "Audience" },
          { key: "created", header: "Created" },
        ]}
        data={notifications}
        getRowId={(row) => row.id}
        emptyState="No notifications have been issued."
      />
    </section>
  );
}
