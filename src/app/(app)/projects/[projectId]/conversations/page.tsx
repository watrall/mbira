import { DataTable, Tag } from "@/components/ui";

const conversations = [
  { id: "c-1", subject: "Translation request", status: "Pending", author: "Visitor" },
  { id: "c-2", subject: "Flagged comment", status: "Flagged", author: "Moderator" },
];

export default function ProjectConversationsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-header font-semibold text-textPrimary">Conversations</h2>
        <p className="text-body text-textSecondary">
          Respond to visitor messages and moderation tasks for this project.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "subject", header: "Subject" },
          { key: "author", header: "From" },
          {
            key: "status",
            header: "Status",
            render: (value) => (
              <Tag tone={value === "Flagged" ? "danger" : "warning"}>{value as string}</Tag>
            ),
          },
        ]}
        data={conversations}
        getRowId={(row) => row.id}
        emptyState="No conversations yet."
      />
    </section>
  );
}
