import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import {
  DEFAULT_PROJECT_SEARCH_LIMIT,
  normalizeSearchTerm,
  searchProjects,
  type ProjectSearchResult,
} from "@/lib/search";
import { selectQueryKeys, useAppStore } from "@/store/app-store";

export interface UseProjectSearchOptions {
  instanceId: string | null;
  term: string;
  includeArchived?: boolean;
  limit?: number;
  enabled?: boolean;
}

export const MIN_SEARCH_TERM_LENGTH = 2;

export function useProjectSearch({
  instanceId,
  term,
  includeArchived = false,
  limit = DEFAULT_PROJECT_SEARCH_LIMIT,
  enabled = true,
}: UseProjectSearchOptions) {
  const queryClient = useQueryClient();
  const queryKeys = useAppStore(selectQueryKeys);
  const normalizedTerm = useMemo(() => normalizeSearchTerm(term), [term]);

  const params = useMemo(
    () => ({
      term: normalizedTerm,
      includeArchived,
      limit,
    }),
    [normalizedTerm, includeArchived, limit],
  );

  const queryKey = useMemo(
    () => queryKeys.search.projects(instanceId, params),
    [queryKeys, instanceId, params],
  );

  const shouldExecute =
    enabled &&
    Boolean(instanceId) &&
    (normalizedTerm.length === 0 || normalizedTerm.length >= MIN_SEARCH_TERM_LENGTH);

  const queryResult = useQuery<ProjectSearchResult[]>({
    queryKey,
    queryFn: () =>
      instanceId
        ? searchProjects({
            instanceId,
            term: normalizedTerm,
            includeArchived,
            limit,
          })
        : Promise.resolve<ProjectSearchResult[]>([]),
    enabled: shouldExecute,
    initialData: () => [] as ProjectSearchResult[],
  });

  const invalidate = () => {
    if (!instanceId) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: queryKeys.search.projectsRoot(instanceId),
      exact: false,
    });
  };

  return {
    ...queryResult,
    results: (queryResult.data ?? []) as ProjectSearchResult[],
    normalizedTerm,
    shouldExecute,
    invalidate,
  };
}
