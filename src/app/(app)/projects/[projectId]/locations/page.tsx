import { Card, DataTable } from "@/components/ui";

const locations = [
  { id: "loc-1", title: "Old Market Square", status: "Published", updated: "Oct 21" },
  { id: "loc-2", title: "Canal Walk", status: "Draft", updated: "Oct 15" },
];

export default function ProjectLocationsPage() {
  return (
    <div className="space-y-6">
      <Card heading="Map overview" description="Preview the spatial footprint of all locations.">
        <div className="flex h-64 items-center justify-center rounded-lg border border-borderDivider bg-bgContent text-caption text-textSecondary">
          Map placeholder (Leaflet integration coming in a subsequent stage)
        </div>
      </Card>

      <DataTable
        columns={[
          { key: "title", header: "Location" },
          { key: "status", header: "Status" },
          { key: "updated", header: "Updated" },
        ]}
        data={locations}
        getRowId={(row) => row.id}
        emptyState="No locations created yet."
      />
    </div>
  );
}
