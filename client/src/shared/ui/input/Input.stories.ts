import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import { Input } from "./Input";

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    isRect: {
      description: "The parameter allows you to make the input rectangular",
    },
    placeholder: {
      description: "The text that will be a placeholder",
    },
    value: {
      description: "The text that will be a value",
    }
  }
};

export default meta;

export const Default: Story = {
  args: {
    isRect: false,
    placeholder: "Text...",
    value: "Text..."
  },
  parameters: {
    docs: {
      description: {
        story: "Default input"
      }
    }
  }
}

export const Rect: Story = {
  args: {
    isRect: true,
    placeholder: "Text...",
    value: "Text..."
  },
  parameters: {
    docs: {
      description: {
        story: "Input with a rectangular borders"
      }
    }
  }
}

export const DefaultFilled: Story = {
  args: {
    isRect: false,
    placeholder: "Text...",
  },
  parameters: {
    docs: {
      description: {
        story: "Default input is filled"
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('input'), "Filled text", {
      delay: 100,
    });
  }
}