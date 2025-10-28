import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
  });

  it("disables when loading", () => {
    render(
      <Button loading aria-label="Submitting">
        Submit
      </Button>,
    );

    const button = screen.getByRole("button", { name: /submitting/i });
    expect(button).toBeDisabled();
    expect(screen.getByTestId("button-spinner")).toBeInTheDocument();
  });
});
