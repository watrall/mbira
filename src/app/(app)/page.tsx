export default function Home() {
  return (
    <section className="rounded-lg border border-borderDivider bg-bgSidebar px-6 py-5 shadow-sm">
      <h2 className="text-header font-medium text-textPrimary">Stage 3 Schema Ready</h2>
      <p className="mt-2 max-w-prose text-body text-textSecondary">
        Database schema, RLS policies, and Supabase types are now in place. Continue with Stage 4 to
        build the authentication UI and login experience.
      </p>
    </section>
  );
}
