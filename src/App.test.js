import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("App", () => {
  test("renders Navigation, Main, Footer, and Sidebar components", () => {
    render(<App />);

    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
