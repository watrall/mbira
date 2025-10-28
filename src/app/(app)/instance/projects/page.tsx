import { InstanceProjectsSearch } from "./_components/instance-projects-search";

export default function InstanceProjectsPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">Projects</h1>
        <p className="text-body text-textSecondary">
          Search across projects in the current instance, review statuses, and jump into authoring
          flows. Results are scoped to your membership and update automatically after you create,
          edit, or archive content.
        </p>
      </header>

      <InstanceProjectsSearch />
    </section>
  );
}
