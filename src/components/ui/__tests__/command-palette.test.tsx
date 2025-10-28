import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CommandPalette } from "../command-palette";

describe("CommandPalette", () => {
  it("filters and executes actions", async () => {
    const items = [
      { id: "1", label: "Create exhibit", action: vi.fn() },
      { id: "2", label: "Invite author", action: vi.fn() },
    ];
    const user = userEvent.setup();

    render(<CommandPalette items={items} open onOpenChange={() => undefined} />);

    const input = screen.getByPlaceholderText(/search actions/i);
    await user.type(input, "Invite");

    await user.keyboard("{Enter}");

    await waitFor(() => expect(items[1]?.action).toHaveBeenCalled());
  });
});
