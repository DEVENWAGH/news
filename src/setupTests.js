// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import React from "react";

// Mock fetch API for tests
global.fetch = jest.fn();

// Reset mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Mock the environment variables
process.env.REACT_APP_NEWS_API = "test-api-key";

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Check if the error is related to React DOM or testing-library
  if (
    args[0] &&
    (args[0].includes("Warning:") ||
      args[0].includes("Error:") ||
      args[0].includes("act("))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  BrowserRouter: ({ children }) => (
    <div data-testid="browser-router">{children}</div>
  ),
  Link: ({ children, to, className }) => (
    <a
      href={to}
      className={className}
      data-testid={`link-${to.replace(/\//g, "-")}`}
    >
      {children}
    </a>
  ),
  Route: ({ children, path }) => (
    <div data-testid={`route-${path?.replace(/\//g, "-")}`}>{children}</div>
  ),
  Switch: ({ children }) => <div data-testid="switch">{children}</div>,
}));

// Mock InfiniteScroll component
jest.mock("react-infinite-scroll-component", () => ({
  __esModule: true,
  default: ({ children, dataLength, next, hasMore }) => (
    <div
      data-testid="infinite-scroll"
      data-length={dataLength}
      data-has-more={hasMore}
      onClick={next}
    >
      {children}
    </div>
  ),
}));

// Mock LoadingBar component
jest.mock("react-top-loading-bar", () => ({
  __esModule: true,
  default: ({ progress, color, height }) => (
    <div
      data-testid="loading-bar"
      data-progress={progress}
      data-color={color}
      data-height={height}
    />
  ),
}));
