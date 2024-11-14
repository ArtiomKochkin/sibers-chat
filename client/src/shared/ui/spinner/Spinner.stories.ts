import { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: 'Shared/Spinner',
  component: Spinner,
  tags: ['autodocs'],
};

export default meta;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: "Default spinner for loading"
      }
    }
  }
};