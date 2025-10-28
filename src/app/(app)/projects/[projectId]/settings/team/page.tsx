import { Badge, Button, DataTable } from "@/components/ui";

const teamMembers = [
  { id: "1", name: "Alex Robertson", role: "Instance Admin", status: "Active" },
  { id: "2", name: "Samira Patel", role: "Project Admin", status: "Pending" },
  { id: "3", name: "Diego Morales", role: "Author", status: "Active" },
];

export default function ProjectSettingsTeamPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h2 className="text-header font-semibold text-textPrimary">Project Team</h2>
        <p className="text-body text-textSecondary">
          Invite collaborators and manage their access within this project.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "role", header: "Role" },
          {
            key: "status",
            header: "Status",
            render: (value) => (
              <Badge variant={value === "Active" ? "solid" : "outline"}>{value as string}</Badge>
            ),
          },
        ]}
        data={teamMembers}
        getRowId={(row) => row.id}
        emptyState="No team members yet. Invite a collaborator to get started."
      />

      <div className="flex justify-end">
        <Button type="button">Invite member</Button>
      </div>
    </section>
  );
}
