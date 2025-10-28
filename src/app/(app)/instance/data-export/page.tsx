import { Button, Card } from "@/components/ui";

export default function InstanceDataExportPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Data Export</h1>
        <p className="text-body text-textSecondary">
          Generate exports of instance content for archival or integration purposes. Exports include
          projects, media metadata, and role assignments.
        </p>
      </header>

      <Card
        heading="Generate export"
        description="Exports are delivered as signed downloads and expire after 24 hours."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button type="button">Start export</Button>
          <p className="text-caption text-textSecondary">
            Last export run Oct 14, 2024 by Alex Robertson.
          </p>
        </div>
      </Card>
    </section>
  );
}
