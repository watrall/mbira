import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage 2 guidance copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /stage 2 systems online/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/global store, supabase clients, and server-side session hydration/i),
    ).toBeInTheDocument();
  });
});
