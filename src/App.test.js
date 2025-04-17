import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the components used in App.js
jest.mock("./components/NavBar", () => () => (
  <div data-testid="navbar">Mock NavBar</div>
));
jest.mock("./components/News", () => () => (
  <div data-testid="news">Mock News</div>
));
jest.mock("./components/layout/Footer", () => () => (
  <div data-testid="footer">Mock Footer</div>
));

test("renders the app with main components", () => {
  render(<App />);

  // Check for the NavBar component
  expect(screen.getByTestId("navbar")).toBeInTheDocument();

  // Check for the News component
  expect(screen.getByTestId("news")).toBeInTheDocument();

  // Check for the Footer component
  expect(screen.getByTestId("footer")).toBeInTheDocument();

  // Check for the main container div
  expect(screen.getByTestId("browser-router")).toBeInTheDocument();
});
