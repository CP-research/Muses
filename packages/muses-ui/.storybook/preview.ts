import type { Preview } from "@storybook/react-vite";
import "../src/styles/storybook.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      options: {
        background: { name: "background", value: "#F8FAFC" },
        surface: { name: "surface", value: "#FFFFFF" },
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          ["Colors", "Typography"],
          "Components",
          "Layout",
        ],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "background" },
  },
};

export default preview;
