"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/ui";
import { MIN_SEARCH_TERM_LENGTH, useProjectSearch } from "@/hooks/use-project-search";
import { selectActiveInstanceId, useAppStore } from "@/store/app-store";

type ProjectRow = {
  id: string;
  name: string;
  status: string;
  updated: string;
};

const FALLBACK_PROJECTS: ProjectRow[] = [
  { id: "demo", name: "Demo Project", status: "Published", updated: "Oct 27, 2024" },
  { id: "archival", name: "Archival Stories", status: "Draft", updated: "Oct 12, 2024" },
];

const DATE_FORMATTER = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

const formatUpdated = (iso: string) => {
  try {
    return DATE_FORMATTER.format(new Date(iso));
  } catch {
    return iso;
  }
};

const formatStatus = (status: string) =>
  status.replace(/_/g, " ").replace(/^\w/, (char) => char.toUpperCase());

export function InstanceProjectsSearch() {
  const activeInstanceId = useAppStore(selectActiveInstanceId);
  const [term, setTerm] = useState("");

  const { results, normalizedTerm, isFetching, shouldExecute } = useProjectSearch({
    instanceId: activeInstanceId,
    term,
    limit: 50,
  });

  const tableRows = useMemo(() => {
    if (!activeInstanceId) {
      return FALLBACK_PROJECTS;
    }

    return results.map<ProjectRow>((project) => ({
      id: project.id,
      name: project.name,
      status: formatStatus(project.status),
      updated: formatUpdated(project.updated_at),
    }));
  }, [activeInstanceId, results]);

  const emptyStateMessage = !activeInstanceId
    ? "Demo projects are shown until you connect to an instance."
    : normalizedTerm.length > 0 && normalizedTerm.length < MIN_SEARCH_TERM_LENGTH
      ? `Enter at least ${MIN_SEARCH_TERM_LENGTH} characters to search.`
      : "No projects match your search.";

  const handleClear = () => setTerm("");

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative w-full sm:max-w-md">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-textSecondary"
            aria-hidden="true"
          />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder={
              activeInstanceId
                ? "Search projects by name, summary, or slug"
                : "Select an instance to search live data"
            }
            className="h-10 w-full rounded-md border border-borderDivider bg-white pl-9 pr-10 text-body text-textPrimary placeholder:text-textSecondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bgContent disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!activeInstanceId}
            aria-describedby="project-search-helper"
          />
          {term ? (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full border border-borderDivider bg-white text-textSecondary transition hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Clear project search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </label>
        <p id="project-search-helper" className="text-caption text-textSecondary">
          {activeInstanceId
            ? isFetching
              ? "Searching…"
              : `${tableRows.length} project${tableRows.length === 1 ? "" : "s"}`
            : "Using seeded demo data"}
        </p>
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Project" },
          { key: "status", header: "Status" },
          { key: "updated", header: "Last Updated" },
        ]}
        data={tableRows}
        getRowId={(row) => row.id}
        emptyState={emptyStateMessage}
      />
      {activeInstanceId && !shouldExecute && normalizedTerm.length > 0 ? (
        <p className="text-caption text-systemWarning">
          Continue typing to run search — minimum {MIN_SEARCH_TERM_LENGTH} characters.
        </p>
      ) : null}
    </div>
  );
}
