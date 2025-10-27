export function PageHeaderPlaceholder() {
  return (
    <section aria-labelledby="page-header-title" className="border-b border-borderDivider pb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h1 id="page-header-title" className="text-page-title text-textPrimary">
            Workspace Overview
          </h1>
          <p className="max-w-xl text-body text-textSecondary">
            Stage 1 scaffolding is in place. Future stages will populate this header with
            breadcrumbs, context actions, and secondary controls.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-borderDivider bg-bgSidebar px-4 py-2 text-sm font-medium text-textPrimary shadow-sm"
          >
            Secondary Action
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white shadow-sm"
          >
            Primary Action
          </button>
        </div>
      </div>
    </section>
  );
}
