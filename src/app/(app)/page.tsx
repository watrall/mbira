import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-lg border border-borderDivider bg-white p-6 shadow-sm">
      <h2 className="text-header font-semibold text-textPrimary">Stage 9 Search Pipeline</h2>
      <p className="mt-2 max-w-prose text-body text-textSecondary">
        ILIKE-powered project search, query-key scaffolding, and React Query invalidation are wired
        in. Use the navigation to verify live search, mutation cache sweeps, and the
        instance/project shells delivered earlier.
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
