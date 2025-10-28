import type { Session } from "@supabase/supabase-js";
import { beforeEach, describe, expect, it } from "vitest";

import { useAppStore } from "./app-store";

const createMockSession = (): Session =>
  ({
    access_token: "access-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: "refresh-token",
    provider_token: null,
    provider_refresh_token: null,
    user: {
      id: "user-123",
    },
  }) as unknown as Session;

describe("useAppStore", () => {
  beforeEach(() => {
    useAppStore.getState().actions.reset();
  });

  it("stores session details", () => {
    const session = createMockSession();
    useAppStore.getState().actions.setSession(session);

    expect(useAppStore.getState().session).toEqual(session);
  });

  it("resets active project when instance changes", () => {
    const { setActiveInstance, setActiveProject } = useAppStore.getState().actions;

    setActiveInstance("instance-A");
    setActiveProject("project-A");

    expect(useAppStore.getState().activeProjectId).toBe("project-A");

    setActiveInstance("instance-B");

    expect(useAppStore.getState().activeProjectId).toBeNull();
  });

  it("manages sidebar and density preferences", () => {
    const { toggleSidebar, setSidebarOpen, setDensity } = useAppStore.getState().actions;

    toggleSidebar();
    expect(useAppStore.getState().ui.sidebarOpen).toBe(false);

    setSidebarOpen(true);
    expect(useAppStore.getState().ui.sidebarOpen).toBe(true);

    setDensity("compact");
    expect(useAppStore.getState().ui.density).toBe("compact");
  });

  it("adds and removes toast messages", () => {
    const { pushToast, dismissToast, clearToasts } = useAppStore.getState().actions;

    const toastId = pushToast({
      title: "Saved",
      description: "Project changes stored successfully.",
      variant: "success",
    });

    expect(useAppStore.getState().ui.toasts).toHaveLength(1);
    expect(useAppStore.getState().ui.toasts[0]?.id).toBe(toastId);

    dismissToast(toastId);
    expect(useAppStore.getState().ui.toasts).toHaveLength(0);

    pushToast({
      id: "toast-1",
      title: "Warning",
      description: "Review validation errors.",
      variant: "warning",
    });
    pushToast({
      id: "toast-2",
      title: "Notice",
      description: "Background sync complete.",
      variant: "neutral",
    });

    expect(useAppStore.getState().ui.toasts).toHaveLength(2);

    clearToasts();
    expect(useAppStore.getState().ui.toasts).toHaveLength(0);
  });
});
