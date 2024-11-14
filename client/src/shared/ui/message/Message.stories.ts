import { Meta, StoryObj } from "@storybook/react";
import { Message } from "./Message";

type Story = StoryObj<typeof Message>;

const meta: Meta<typeof Message> = {
  title: 'Shared/Message',
  component: Message,
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: "The name of the author of the message"
    },
    message: {
      description: "The full text of the message"
    },
    time: {
      description: "The time of the message"
    },
    styleMessage: {
      description: "The style of the message"
    },
  }
};

export default meta;

export const Default: Story = {
  args: {
    name: "Username",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    styleMessage: "",
    time: "12:00:00"
  },
  argTypes: {
    styleMessage: {
      control: false,
      table: {
        disable: false
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Default message"
      }
    }
  }
}