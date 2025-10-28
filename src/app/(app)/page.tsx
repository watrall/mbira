import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-lg border border-borderDivider bg-white p-6 shadow-sm">
      <h2 className="text-header font-semibold text-textPrimary">Stage 8 Routing Ready</h2>
      <p className="mt-2 max-w-prose text-body text-textSecondary">
        Instance and project workspaces are scaffolded with navigation, tables, editor placeholders,
        and upload demos. Choose an area below to continue building.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-body">
        <Link href="/instance" className="text-accent underline">
          Instance overview
        </Link>
        <Link href="/projects/demo" className="text-accent underline">
          Demo project dashboard
        </Link>
        <Link href="/media-demo" className="text-accent underline">
          Upload sandbox
        </Link>
      </div>
    </section>
  );
}
