import { render, screen } from "@testing-library/react";
import { LeftRoom } from "./LeftRoom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { socket } from "@shared/api";

jest.mock("@shared/api", () => ({
  socket: {
    emit: jest.fn(),
  }
}));

describe("LeftRoom component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with default props", () => {
    render(
      <MemoryRouter initialEntries={["/chat"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route 
            path="/chat" 
            element={<LeftRoom params={{ room: "Room", name: "Username" }}/>} 
          />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Left the room/i });
    expect(button).toBeInTheDocument();
  });

  it("calls socket.emit and redirects to home page", async () => {
    const params = { room: "Room", name: "Username" };
    render(
      <MemoryRouter initialEntries={["/chat"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route 
            path="/chat" 
            element={<LeftRoom params={params}/>} 
          />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Left the room/i });

    await userEvent.click(button);

    expect(socket.emit).toHaveBeenCalledWith("leftRoom", { params });

    const homePage = await screen.findByText("Home Page");
    expect(homePage).toBeInTheDocument();
  });
});