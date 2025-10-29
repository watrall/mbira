import { DataTable, Tag } from "@/components/ui";

const users = [
  { id: "1", name: "Alex Robertson", email: "alex@museum.org", role: "Instance Admin" },
  { id: "2", name: "Samira Patel", email: "samira@museum.org", role: "Project Admin" },
  { id: "3", name: "Diego Morales", email: "diego@museum.org", role: "Author" },
];

export default function InstanceUsersPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">User Management</h1>
        <p className="text-body text-textSecondary">
          Invite, promote, or suspend collaborators. Roles control access across the instance and
          projects.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role", render: (value) => <Tag>{value as string}</Tag> },
        ]}
        data={users}
        getRowId={(row) => row.id}
        emptyState="No users found. Invite your first collaborator to get started."
      />
    </section>
  );
}
