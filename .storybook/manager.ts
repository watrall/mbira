import { addons } from "@storybook/preview-api";

import { archiveSlateTheme } from "./theme";

addons.setConfig({
  theme: archiveSlateTheme,
});
