import { fireEvent, render, screen } from "@testing-library/react";
import { Search } from "./Search";

describe("Search component", () => {
  it("renders correctly with default props", () => {
    render(<Search searchQuery="user" setSearchQuery={jest.fn()}/>);

    const search = screen.getByPlaceholderText("Search users");

    expect(search).toBeInTheDocument();
    expect(search).toHaveValue("user");
  });

  it("calls handler on input change", async () => {
    const setSearchQuery = jest.fn();
    render(<Search searchQuery="" setSearchQuery={setSearchQuery}/>);

    const search = screen.getByPlaceholderText("Search users");

    expect(search).toHaveValue("");

    fireEvent.change(search, { target: { value: "admin" } });
    expect(setSearchQuery).toHaveBeenCalledWith("admin");
    expect(setSearchQuery).toHaveBeenCalledTimes(1);
  });
});