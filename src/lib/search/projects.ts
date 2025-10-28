import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Database } from "@/types/schema";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

export type ProjectSearchResult = Pick<
  ProjectRow,
  "id" | "instance_id" | "name" | "slug" | "summary" | "status" | "visibility" | "updated_at"
>;

export interface ProjectSearchParams {
  instanceId: string;
  term?: string;
  includeArchived?: boolean;
  limit?: number;
  offset?: number;
}

export const DEFAULT_PROJECT_SEARCH_LIMIT = 20;

export const normalizeSearchTerm = (term: string) => term.trim().replace(/\s+/g, " ");

const escapeForPattern = (term: string) =>
  term.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/_/g, "\\_").replace(/,/g, "\\,");

export async function searchProjects({
  instanceId,
  term = "",
  includeArchived = false,
  limit = DEFAULT_PROJECT_SEARCH_LIMIT,
  offset = 0,
}: ProjectSearchParams) {
  if (!instanceId) {
    return [];
  }

  const supabase = getSupabaseBrowserClient();
  const normalizedTerm = normalizeSearchTerm(term);
  const shouldFilterByTerm = normalizedTerm.length > 0;
  const pattern = shouldFilterByTerm ? `%${escapeForPattern(normalizedTerm)}%` : null;

  let query = supabase
    .from("projects")
    .select("id, instance_id, name, slug, summary, status, visibility, updated_at")
    .eq("instance_id", instanceId)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });

  if (!includeArchived) {
    query = query.neq("status", "archived");
  }

  if (pattern) {
    query = query.or(
      [`name.ilike.${pattern}`, `summary.ilike.${pattern}`, `slug.ilike.${pattern}`].join(","),
    );
  }

  if (offset > 0) {
    query = query.range(offset, offset + limit - 1);
  } else {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(
      `Failed to perform project search. ${error.message ?? "Please try again later."}`,
    );
  }

  return (data ?? []) as ProjectSearchResult[];
}
