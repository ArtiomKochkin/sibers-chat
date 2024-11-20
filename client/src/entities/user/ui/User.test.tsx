import { render, screen } from "@testing-library/react";
import { User } from "./User";

describe("User component", () => {

  it("renders correctly with default props if the user is an admin", () => {
    const user = { isAdmin: false, name: "Username" };
    render(<User isAdmin={true} room="Room name" user={user}/>);

    const name = screen.getByText(user.name);
    const removeUser = screen.getByRole("application");

    expect(name).toBeInTheDocument();
    expect(removeUser).toBeInTheDocument();
  });

  it("renders correctly with default props if it is a regular user", () => {
    const user = { isAdmin: false, name: "Username" };
    render(<User isAdmin={false} room="Room name" user={user}/>);

    const name = screen.getByText(user.name);
    const removeUser = screen.queryByRole("application");

    expect(name).toBeInTheDocument();
    expect(removeUser).toBeNull();
  });
});