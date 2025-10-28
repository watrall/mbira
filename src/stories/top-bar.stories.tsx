import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "@/components/layout/top-bar";

const meta: Meta<typeof TopBar> = {
  title: "Layout/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/instance",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-bgSidebar">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopBar>;

export const InstanceOverview: Story = {};

export const ProjectDashboard: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/projects/demo",
      },
    },
  },
};
