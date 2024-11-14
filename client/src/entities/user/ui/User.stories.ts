import { Meta, StoryObj } from "@storybook/react";
import { User } from "./User";

type Story = StoryObj<typeof User>

const meta: Meta<typeof User> = {
  title: "Entities/User",
  component: User,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isAdmin: {
      description: "The parameter determines whether the current user is an admin"
    },
    room: {
      description: "The chat where the user is located. Required for the user deletion function"
    },
    user: {
      description: "The current user"
    }
  }
};

export default meta;

export const Default: Story = {
  args: {
    isAdmin: false,
    room: "Room",
    user: {
      name: "Name",
      isAdmin: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Default user in sidebar"
      }
    }
  }
};

export const Admin: Story = {
  args: {
    isAdmin: true,
    room: "Room",
    user: {
      name: "Name",
      isAdmin: false
    }
  },
  parameters: {
    docs: {
      description: {
        story: "User who is the admin"
      }
    }
  }
}