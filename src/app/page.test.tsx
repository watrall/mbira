import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the stage bootstrap message", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /mbira authoring tool/i })).toBeInTheDocument();
    expect(screen.getByText(/workspace bootstrap complete/i)).toBeInTheDocument();
  });
});
