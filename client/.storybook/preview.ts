import type { Preview } from "@storybook/react";
import '../src/app/styles/index.scss';
import './storybook.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Primary', value: "#31273b" }
      ],
      default: "Primary",
    },
    layout: 'centered',
  },
};

export default preview;
