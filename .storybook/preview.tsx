import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

const preview: Preview = {
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Global locale for components",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        items: [{ value: "en", title: "English" }],
      },
    },
  },
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: "content",
      values: [
        { name: "content", value: "#F9FAFB" },
        { name: "panel", value: "#FFFFFF" },
        { name: "accent", value: "#0094BC" },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-bgContent p-8 text-textPrimary">
        <Story />
      </div>
    ),
  ],
};

export default preview;
