import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { DEFAULT_PROJECT_SEARCH_LIMIT, type ProjectSearchResult } from "@/lib/search";
import { useAppStore } from "@/store/app-store";

import { useProjectSearch } from "../use-project-search";

type SupabaseQueryResult =
  | { data: ProjectSearchResult[]; error: null }
  | { data: null; error: { message: string } };

const mockFrom = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    from: mockFrom,
  }),
}));

const createQueryBuilder = (execute: () => Promise<SupabaseQueryResult>) => {
  const builder: any = {
    select: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    is: vi.fn(() => builder),
    order: vi.fn(() => builder),
    neq: vi.fn(() => builder),
    or: vi.fn(() => builder),
    range: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    then(
      onFulfilled: (value: SupabaseQueryResult) => unknown,
      onRejected?: (reason: unknown) => unknown,
    ) {
      return execute().then(onFulfilled, onRejected);
    },
  };

  return builder;
};

const createWrapper = (queryClient: QueryClient) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = "ProjectSearchQueryWrapper";

  return Wrapper;
};

describe("useProjectSearch", () => {
  beforeEach(() => {
    useAppStore.getState().actions.reset();
    mockFrom.mockReset();
  });

  it("normalizes the search term and issues an ILIKE query across key fields", async () => {
    const sampleResults: ProjectSearchResult[] = [
      {
        id: "project-1",
        instance_id: "instance-1",
        name: "Archive Stories",
        slug: "archive-stories",
        summary: "A sample project",
        status: "published",
        visibility: "visible",
        updated_at: "2024-10-28T12:00:00.000Z",
      },
    ];

    let lastBuilder: ReturnType<typeof createQueryBuilder> | null = null;
    mockFrom.mockImplementation(() => {
      lastBuilder = createQueryBuilder(() => Promise.resolve({ data: sampleResults, error: null }));
      return lastBuilder;
    });
    const queryClient = new QueryClient();

    const { result } = renderHook(
      () =>
        useProjectSearch({
          instanceId: "instance-1",
          term: "  archive stories ",
        }),
      {
        wrapper: createWrapper(queryClient),
      },
    );

    await waitFor(() => expect(result.current.results).toEqual(sampleResults));

    expect(mockFrom).toHaveBeenCalledWith("projects");
    expect(lastBuilder?.select).toHaveBeenCalledWith(
      "id, instance_id, name, slug, summary, status, visibility, updated_at",
    );
    expect(lastBuilder?.eq).toHaveBeenCalledWith("instance_id", "instance-1");
    expect(lastBuilder?.neq).toHaveBeenCalledWith("status", "archived");
    expect(lastBuilder?.or).toHaveBeenCalledWith(
      expect.stringContaining("name.ilike.%archive stories%"),
    );
    expect(lastBuilder?.limit).toHaveBeenCalledWith(DEFAULT_PROJECT_SEARCH_LIMIT);
    expect(result.current.normalizedTerm).toBe("archive stories");
  });

  it("skips execution when the search term is shorter than the minimum length", () => {
    mockFrom.mockImplementation(() =>
      createQueryBuilder(() => Promise.resolve({ data: [], error: null })),
    );

    const queryClient = new QueryClient();
    const { result } = renderHook(
      () =>
        useProjectSearch({
          instanceId: "instance-1",
          term: "a",
        }),
      {
        wrapper: createWrapper(queryClient),
      },
    );

    expect(result.current.shouldExecute).toBe(false);
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it("exposes an invalidate helper that clears cached project searches", async () => {
    mockFrom.mockImplementation(() =>
      createQueryBuilder(() => Promise.resolve({ data: [], error: null })),
    );

    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(
      () =>
        useProjectSearch({
          instanceId: "instance-1",
          term: "",
        }),
      {
        wrapper: createWrapper(queryClient),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => {
      result.current.invalidate();
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ["search", "projects", "instance-1"],
      exact: false,
    });
  });
});
