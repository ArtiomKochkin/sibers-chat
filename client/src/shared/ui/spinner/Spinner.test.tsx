import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner component", () => {
  it("renders correctly", () => {
    render(<Spinner/>);
    const spinner = screen.getByRole("img");

    expect(spinner).toBeInTheDocument();
  });
});