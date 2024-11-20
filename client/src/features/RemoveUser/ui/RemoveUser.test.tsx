import { render, screen } from "@testing-library/react";
import { RemoveUser } from "./RemoveUser";
import userEvent from "@testing-library/user-event";
import { socket } from "@shared/api";

jest.mock("@shared/api", () => ({
  socket: {
    emit: jest.fn()
  }
}));

describe("RemoveUser component", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    const user = { isAdmin: true, name: "Username" };
    render(
      <RemoveUser isAdmin={true} room="Room" user={user} />
    );

    const button = screen.getByRole("application");
    
    expect(button).toBeInTheDocument();
  });

  it("calls socket.emit correctly", async () => {
    const user = { isAdmin: true, name: "Username" };
    render(
      <RemoveUser isAdmin={true} room="Room" user={user} />
    );

    const button = screen.getByRole("application");
    
    await userEvent.click(button);
    
    expect(socket.emit).toHaveBeenCalledWith("removeUser", { 
      name: user.name,
      room: "Room"
    });
  });

  it("don't calls socket.emit if user is not admin", async () => {
    const user = { isAdmin: false, name: "Username" };
    render(
      <RemoveUser isAdmin={false} room="Room" user={user} />
    );

    const button = screen.getByRole("application");
    
    await userEvent.click(button);
    expect(socket.emit).not.toHaveBeenCalled();
  });
});