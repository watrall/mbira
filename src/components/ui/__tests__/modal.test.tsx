import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button";
import { Modal } from "../modal";

describe("Modal", () => {
  it("renders title and calls close", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal
        open
        onClose={onClose}
        title="Confirm delete"
        description="This action cannot be undone"
        primaryAction={<Button>Confirm</Button>}
      >
        Content
      </Modal>,
    );

    expect(screen.getByRole("heading", { name: /confirm delete/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /close modal/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
