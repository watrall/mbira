import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAppStore } from "@/store/app-store";

import { Sidebar } from "../sidebar";
import { TopBar } from "../top-bar";

let mockPathname = "/";

vi.mock("next/navigation", async () => {
  const actual = (await vi.importActual("next/navigation")) as Record<string, unknown>;
  return {
    ...actual,
    usePathname: () => mockPathname,
  };
});

vi.mock("@/lib/supabase/auth", () => ({
  signOutServerAction: vi.fn(),
}));

function NavigationHarness() {
  return (
    <div>
      <Sidebar />
      <TopBar />
    </div>
  );
}

describe("Navigation shell", () => {
  beforeEach(() => {
    mockPathname = "/";
    useAppStore.getState().actions.reset();
  });

  it("allows opening and closing the mobile menu with keyboard", async () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 375 });
    const user = userEvent.setup();

    render(<NavigationHarness />);

    const toggleButton = screen.getByRole("button", { name: /open navigation/i });

    toggleButton.focus();
    await user.keyboard("{Enter}");

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /close navigation/i })).toBeVisible(),
    );

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /close navigation/i })).not.toBeInTheDocument();
    });
  });
});
