import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage 8 guidance copy", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /stage 8 routing ready/i, level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/instance and project workspaces are scaffolded/i)).toBeInTheDocument();
  });
});
