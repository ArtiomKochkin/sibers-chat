import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  args: { 
    onClick: fn()
  },
  argTypes: {
    children: {
      description: "The text that is inside the button",
      control: { type: "text" },
      table: {
        type: { summary: 'string' }
      }
    },
    onClick: {
      table: {
        type: { summary: '(() => {})' }
      }
    }
  },
};

export default meta;

export const Default: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    docs: {
      description: {
        story: "Default button"
      }
    }
  }
}
