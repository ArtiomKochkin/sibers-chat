import { render, screen } from "@testing-library/react";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router-dom";

describe("HomePage component", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const title = screen.getByText("Online chat");
    const form = screen.getByRole("form");

    expect(title).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  })
});