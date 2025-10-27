import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage 1 guidance copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /stage 1 foundations ready/i, level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/design tokens, typography, and the global layout shell/i),
    ).toBeInTheDocument();
  });
});
