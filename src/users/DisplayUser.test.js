import { render, screen, act, waitFor } from "@testing-library/react";
import DisplayUsers from "./DisplayUsers";
describe("DisplayUsers", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("renders Display users component", () => {
    render(<DisplayUsers />);
    const linkElement = screen.getByText(/Users/i);
    expect(linkElement).toBeInTheDocument();
    expect(screen.getByTestId("users")).toBeInTheDocument();
  });
  test("renders users list", async () => {
    const users = [
      { id: 1, name: "Pankaj", email: "john@example.com", message: "Hello1" },
      {
        id: 2,
        name: "Rashmi S",
        email: "jane@example.com",
        message: "Hello2",
      },
      {
        id: 3,
        name: "harsha",
        email: "bob@example.com",
        message: "Hello3",
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(users),
      })
    );

    await act(() => Promise.resolve(render(<DisplayUsers />)));
    // for (let user of users) {
    //   await screen.findByText(user?.name);
    // }

    // Check that each user is in the document
    // for (let user of users) {
    //   expect(screen.getByText(user.name)).toBeInTheDocument();
    // }
  });
});
