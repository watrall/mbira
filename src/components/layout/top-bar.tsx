export function TopBarPlaceholder() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-borderDivider bg-bgSidebar px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-caption uppercase tracking-[0.16em] text-systemNeutral">
          Breadcrumb
        </span>
        <span className="text-body font-medium text-textPrimary">Instance / Project</span>
      </div>
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="size-9 rounded-full border border-borderDivider bg-bgContent"
        />
        <span className="text-body text-textSecondary">User Menu</span>
      </div>
    </header>
  );
}
