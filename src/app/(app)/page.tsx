import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-lg border border-borderDivider bg-white p-6 shadow-sm">
      <h2 className="text-header font-semibold text-textPrimary">Stage 11 Validation Suite</h2>
      <p className="mt-2 max-w-prose text-body text-textSecondary">
        Type checking, linting, unit tests, Playwright smoke, Storybook visual checks, and the axe
        accessibility scan are ready to run. Use these gates to certify each module before shipping.
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-body">
        <Link href="/instance" className="text-accent-strong underline">
          Instance overview
        </Link>
        <Link href="/projects/demo" className="text-accent-strong underline">
          Demo project dashboard
        </Link>
        <Link href="/media-demo" className="text-accent-strong underline">
          Upload sandbox
        </Link>
      </div>
    </section>
  );
}
