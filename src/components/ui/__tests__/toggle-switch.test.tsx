import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ToggleSwitch } from "../toggle-switch";

describe("ToggleSwitch", () => {
  it("calls onChange when toggled", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ToggleSwitch checked={false} onChange={onChange} label="Demo" />);

    const switchButton = screen.getByRole("switch", { name: /demo/i });
    await user.click(switchButton);

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
