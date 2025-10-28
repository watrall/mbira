import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
  args: {
    children: "Create project",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Delete exhibit",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
