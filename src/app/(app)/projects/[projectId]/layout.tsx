import type { PropsWithChildren } from "react";

const PROJECT_TITLES: Record<string, string> = {
  demo: "Demo Project",
  "demo-project": "Demo Project",
};

export default function ProjectLayout({
  params,
  children,
}: PropsWithChildren<{ params: { projectId: string } }>) {
  const title = PROJECT_TITLES[params.projectId] ?? params.projectId;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-page-title text-textPrimary">{title}</h1>
        <p className="text-body text-textSecondary">
          Manage content, locations, and publishing workflows for this project.
        </p>
      </header>
      {children}
    </div>
  );
}
