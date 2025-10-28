import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAppStore } from "@/store/app-store";

import { LoginForm } from "./login-form";

const pushMock = vi.fn();
const refreshMock = vi.fn();

const signInWithPasswordMock = vi.fn();
const signInWithOAuthMock = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  getSupabaseBrowserClient: () => ({
    auth: {
      signInWithPassword: signInWithPasswordMock,
      signInWithOAuth: signInWithOAuthMock,
    },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    signInWithPasswordMock.mockReset();
    signInWithOAuthMock.mockReset();
    pushMock.mockReset();
    refreshMock.mockReset();
    useAppStore.getState().actions.reset();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("submits credentials via supabase", async () => {
    signInWithPasswordMock.mockResolvedValueOnce({
      data: { session: { access_token: "token" } },
      error: null,
    });

    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByLabelText(/email address/i), "user@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");

    const submitButtons = screen.getAllByRole("button", { name: /sign in/i });
    await user.click(submitButtons[0]!);

    expect(signInWithPasswordMock).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
    });
    expect(pushMock).toHaveBeenCalledWith("/");
  });
});
