import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage 3 guidance copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /stage 3 schema ready/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/database schema, rls policies, and supabase types/i),
    ).toBeInTheDocument();
  });
});
