import { DataTable, Tag } from "@/components/ui";

const conversations = [
  { id: "req-1", subject: "Accessibility feedback", status: "Pending", project: "Demo Project" },
  {
    id: "req-2",
    subject: "Audio transcript request",
    status: "Approved",
    project: "Archival Stories",
  },
];

export default function InstanceConversationsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Conversations</h1>
        <p className="text-body text-textSecondary">
          Review moderation items and visitor feedback routed to instance admins.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "subject", header: "Subject" },
          { key: "project", header: "Project" },
          {
            key: "status",
            header: "Status",
            render: (value) => (
              <Tag tone={value === "Approved" ? "success" : "warning"}>{value as string}</Tag>
            ),
          },
        ]}
        data={conversations}
        getRowId={(row) => row.id}
        emptyState="No conversation threads yet."
      />
    </section>
  );
}
