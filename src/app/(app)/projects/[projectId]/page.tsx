import { Card } from "@/components/ui";

export default function ProjectDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <Card heading="Draft exhibits" description="Awaiting review before publishing.">
        <p className="text-page-title text-textPrimary">4</p>
      </Card>
      <Card heading="Published locations" description="Live across map experiences.">
        <p className="text-page-title text-textPrimary">18</p>
      </Card>
      <Card heading="Tasks" description="Outstanding editorial checklist items.">
        <p className="text-page-title text-textPrimary">5</p>
      </Card>
    </div>
  );
}
