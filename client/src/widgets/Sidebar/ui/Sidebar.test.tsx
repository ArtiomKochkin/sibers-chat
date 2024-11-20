import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";
import styles from "./Sidebar.module.scss";
import userEvent from "@testing-library/user-event";

describe("Sidebar component", () => {
  
  it("renders correctly with default props", () => {
    const users = [
      { name: "Kate", isAdmin: true },
      { name: "Clare", isAdmin: false },
    ];
    render(
      <Sidebar 
        isAdmin={true}
        isOpen={true}
        room="Room name"
        users={users}
      />
    );

    const title = screen.getByText("Room name");
    const subtitle = screen.getByText(`Users (${users.length})`);
    const userItems = screen.getAllByRole("listitem");

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(userItems).toHaveLength(2);
  });

  it("renders correctly with empty array of users", () => {
    render(
      <Sidebar 
        isAdmin={true}
        isOpen={true}
        room="Room name"
        users={[]}
      />
    );

    const usersContainer = screen.getByRole("list");

    expect(usersContainer).toBeInTheDocument();
    expect(usersContainer).toBeEmptyDOMElement();
  });

  it("shows in a hidden form", () => {
    render(
      <Sidebar 
        isAdmin={true}
        isOpen={false}
        room="Room name"
        users={[]}
      />
    );

    const sidebar = screen.getByRole("complementary");

    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass(styles.hidden);
  });

  it("applies the mobile class when innerWidth is less than 768", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500
    });
    window.dispatchEvent(new Event("resize"));

    render(
      <Sidebar 
        isAdmin={true}
        isOpen={true}
        room="Room name"
        users={[]}
      />
    );

    const sidebar = screen.getByRole("complementary");
    expect(sidebar).toHaveClass(styles.mobile);
  });

  it("updates the search field and the list of users", async () => {
    const users = [
      { name: "Kate", isAdmin: true },
      { name: "Katrine", isAdmin: false },
      { name: "Clare", isAdmin: false },
    ];
    render(
      <Sidebar 
        isAdmin={true}
        isOpen={true}
        room="Room name"
        users={users}
      />
    );

    const search = screen.getByRole("search");
    const userItems = screen.getAllByRole("listitem");

    expect(search).toBeInTheDocument();
    expect(userItems).toHaveLength(3);

    await userEvent.type(search, "ka");

    const firstUser = screen.getByText("Kate");
    const secondUser = screen.getByText("Katrine");
    const thirdUser = screen.queryByText("Clare");

    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
    expect(thirdUser).toBeNull();

    await userEvent.clear(search);
    await userEvent.type(search, "fake name");

    const userItemsAfterType = screen.queryAllByRole("listitem");
    expect(userItemsAfterType).toHaveLength(0);
  });
});