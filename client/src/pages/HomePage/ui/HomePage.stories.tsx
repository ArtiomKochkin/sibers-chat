import { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "./HomePage";

type Story = StoryObj<typeof HomePage>;

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: "padded"
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    )
  ]
}

export default meta;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default home page'
      }
    }
  }
}