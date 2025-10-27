export default function Home() {
  return (
    <section className="rounded-lg border border-borderDivider bg-bgSidebar px-6 py-5 shadow-sm">
      <h2 className="text-header font-medium text-textPrimary">Stage 1 Foundations Ready</h2>
      <p className="mt-2 max-w-prose text-body text-textSecondary">
        Design tokens, typography, and the global layout shell are in place. Continue with Stage 2
        to wire the application store, Supabase clients, and session helpers.
      </p>
    </section>
  );
}
