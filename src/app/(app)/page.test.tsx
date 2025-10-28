import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage 9 guidance copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /stage 9 search pipeline/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/ILIKE-powered project search/i)).toBeInTheDocument();
  });
});
