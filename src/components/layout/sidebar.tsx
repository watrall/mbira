export function SidebarPlaceholder() {
  return (
    <aside
      aria-label="Primary navigation"
      className="hidden w-72 flex-col gap-6 border-r border-borderDivider bg-bgSidebar px-6 py-8 lg:flex"
    >
      <div className="space-y-2">
        <p className="text-caption uppercase tracking-[0.16em] text-systemNeutral">Sidebar</p>
        <h2 className="text-header font-medium text-textPrimary">Navigation Placeholder</h2>
      </div>
      <p className="max-w-72 text-body text-textSecondary">
        Stage 5 will replace this block with the responsive navigation shell.
      </p>
    </aside>
  );
}
