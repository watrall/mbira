import { Badge, Button, DataTable } from "@/components/ui";

const integrations = [
  { id: "vercel", name: "Vercel", status: "Connected", updated: "Oct 19" },
  { id: "mapbox", name: "Mapbox", status: "Not Connected", updated: "—" },
];

export default function InstanceIntegrationsSettingsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Instance Settings · Integrations</h1>
        <p className="text-body text-textSecondary">
          Manage API keys and third-party integrations for maps, analytics, and deployments.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "name", header: "Integration" },
          {
            key: "status",
            header: "Status",
            render: (value) => (
              <Badge variant={value === "Connected" ? "solid" : "outline"}>{value as string}</Badge>
            ),
          },
          {
            key: "updated",
            header: "Updated",
          },
        ]}
        data={integrations}
        getRowId={(row) => row.id}
        emptyState="No integrations configured yet."
      />

      <div className="flex justify-end">
        <Button type="button">Add integration</Button>
      </div>
    </section>
  );
}
