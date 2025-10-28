import { DataTable, Badge } from "@/components/ui";

const media = [
  {
    id: "img-1",
    name: "Heritage Facade",
    type: "image/jpeg",
    size: "1.2 MB",
    visibility: "Visible",
  },
  {
    id: "audio-2",
    name: "Field Recording",
    type: "audio/mpeg",
    size: "4.5 MB",
    visibility: "Hidden",
  },
];

export default function GlobalMediaPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Global Media Library</h1>
        <p className="text-body text-textSecondary">
          Assets stored at the instance level are available to any project with the proper
          permissions. Use this area for branding, shared imagery, and evergreen audio.
        </p>
      </header>

      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "type", header: "Type" },
          { key: "size", header: "Size" },
          {
            key: "visibility",
            header: "Visibility",
            render: (value) => <Badge variant="outline">{value as string}</Badge>,
          },
        ]}
        data={media}
        getRowId={(row) => row.id}
        emptyState="No global media has been uploaded yet."
      />
    </section>
  );
}
