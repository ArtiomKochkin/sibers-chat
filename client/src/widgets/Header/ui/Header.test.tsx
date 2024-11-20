import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

describe("Header component", () => {
  it("renders correctly with default props", () => {
    const params = { room: "Test room", name: "Username" };
    render(
      <MemoryRouter>
        <Header 
          params={params}
          name="Username"
          toggleVisibility={jest.fn()}
        />
      </MemoryRouter>
    );

    const header = screen.getByRole("banner");
    const name = screen.getByText("Username");
    
    expect(header).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});