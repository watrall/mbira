import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";

type DensityMode = "comfortable" | "compact";
export type ToastVariant = "neutral" | "success" | "warning" | "danger";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  autoDismiss?: boolean;
}

export const queryKeys = {
  session: () => ["session"] as const,
  instances: () => ["instances"] as const,
  projects: (instanceId: string | null) => ["projects", instanceId ?? "all"] as const,
  conversations: (projectId: string | null) => ["conversations", projectId ?? "all"] as const,
  media: (projectId: string | null) => ["media", projectId ?? "all"] as const,
  notifications: () => ["notifications"] as const,
  ui: {
    toasts: () => ["ui", "toasts"] as const,
  },
} as const;

interface UiState {
  sidebarOpen: boolean;
  density: DensityMode;
  toasts: Toast[];
}

interface AppState {
  session: Session | null;
  activeInstanceId: string | null;
  activeProjectId: string | null;
  ui: UiState;
  queryKeys: typeof queryKeys;
  actions: {
    setSession: (session: Session | null) => void;
    setActiveInstance: (instanceId: string | null) => void;
    setActiveProject: (projectId: string | null) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    setDensity: (mode: DensityMode) => void;
    pushToast: (toast: Omit<Toast, "id"> & { id?: string }) => string;
    dismissToast: (id: string) => void;
    clearToasts: () => void;
    reset: () => void;
  };
}

const createToastId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
};

const createInitialUiState = (): UiState => ({
  sidebarOpen: true,
  density: "comfortable",
  toasts: [],
});

const createInitialState = (): Pick<
  AppState,
  "session" | "activeInstanceId" | "activeProjectId" | "ui"
> => ({
  session: null,
  activeInstanceId: null,
  activeProjectId: null,
  ui: createInitialUiState(),
});

export const useAppStore = create<AppState>()((set, get) => ({
  ...createInitialState(),
  queryKeys,
  actions: {
    setSession: (session) => set({ session }),
    setActiveInstance: (instanceId) =>
      set((state) => ({
        activeInstanceId: instanceId,
        activeProjectId:
          instanceId && instanceId === state.activeInstanceId ? state.activeProjectId : null,
      })),
    setActiveProject: (projectId) =>
      set((state) => ({
        activeProjectId: state.activeInstanceId === null && projectId !== null ? null : projectId,
      })),
    toggleSidebar: () =>
      set((state) => ({
        ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
      })),
    setSidebarOpen: (open) =>
      set((state) => ({
        ui: { ...state.ui, sidebarOpen: open },
      })),
    setDensity: (mode) =>
      set((state) => ({
        ui: { ...state.ui, density: mode },
      })),
    pushToast: ({ id, ...toast }) => {
      const toastId = id ?? createToastId();
      const snapshot = get();
      if (snapshot.ui.toasts.some((existing) => existing.id === toastId)) {
        set((state) => ({
          ui: {
            ...state.ui,
            toasts: state.ui.toasts.map((existing) =>
              existing.id === toastId ? { ...existing, ...toast } : existing,
            ),
          },
        }));
      } else {
        set((state) => ({
          ui: {
            ...state.ui,
            toasts: [...state.ui.toasts, { id: toastId, ...toast }],
          },
        }));
      }

      return toastId;
    },
    dismissToast: (toastId) =>
      set((state) => ({
        ui: {
          ...state.ui,
          toasts: state.ui.toasts.filter((toast) => toast.id !== toastId),
        },
      })),
    clearToasts: () =>
      set((state) => ({
        ui: { ...state.ui, toasts: [] },
      })),
    reset: () => set({ ...createInitialState() }),
  },
}));

export const selectSession = (state: AppState) => state.session;
export const selectActiveInstanceId = (state: AppState) => state.activeInstanceId;
export const selectActiveProjectId = (state: AppState) => state.activeProjectId;
export const selectUiState = (state: AppState) => state.ui;
export const selectQueryKeys = (state: AppState) => state.queryKeys;
export const selectActions = (state: AppState) => state.actions;
