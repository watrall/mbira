import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/components/ui/card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    heading: "Project activity",
    description: "Track moderation queues and author assignments at a glance.",
    children: (
      <ul className="space-y-3 text-body text-textSecondary">
        <li>
          <span className="font-semibold text-textPrimary">2</span> pending conversations awaiting
          review.
        </li>
        <li>
          <span className="font-semibold text-textPrimary">5</span> exhibits scheduled for this
          week.
        </li>
        <li>Map tiles refreshing nightly using the Archive Slate palette.</li>
      </ul>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Minimal: Story = {
  args: {
    heading: undefined,
    description: undefined,
    children: (
      <p>
        Cards adapt to whatever children you pass. Use them for rich summaries, tables, or action
        panels.
      </p>
    ),
  },
};
