import { Card } from "@/components/ui";

export default function InstanceOverviewPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <Card heading="Active projects" description="Projects currently published or in review.">
        <p className="text-page-title text-textPrimary">6</p>
      </Card>
      <Card heading="Pending conversations" description="Threads awaiting moderator review.">
        <p className="text-page-title text-textPrimary">3</p>
      </Card>
      <Card heading="Storage used" description="Across all project buckets.">
        <p className="text-page-title text-textPrimary">18.4 GB</p>
      </Card>
    </div>
  );
}
