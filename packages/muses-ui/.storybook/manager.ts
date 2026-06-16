import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "storybook",
    brandUrl: "https://storybook.counterpointresearch.com",
    colorPrimary: "#EE1C24",
    colorSecondary: "#EE1C24",
  }),
});
