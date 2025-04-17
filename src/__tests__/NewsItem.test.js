import React from "react";
import { render, screen } from "@testing-library/react";
import NewsItem from "../components/NewsItem";

describe("NewsItem Component", () => {
  const mockProps = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "https://test-image.jpg",
    newsUrl: "https://test-news-url.com",
    author: "Test Author",
    date: "2023-05-15T12:30:45Z",
    source: "Test Source",
  };

  beforeEach(() => {
    // Add a role to the div for testing
    HTMLDivElement.prototype.getAttribute = jest
      .fn()
      .mockImplementation(function (attr) {
        if (attr === "role" && this.className === "card") return "article";
        return null;
      });
  });

  test("renders news item with provided props", () => {
    render(<NewsItem {...mockProps} />);

    // Check if title is rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Check if description is rendered
    expect(screen.getByText("Test Description")).toBeInTheDocument();

    // Check if source badge is rendered (using more flexible selector)
    const sourceBadge = screen.getByText(/Test Source/i);
    expect(sourceBadge).toBeInTheDocument();

    // Check if author and date are rendered (using more flexible text content)
    const byLine = screen.getByText(/By Test Author/i);
    expect(byLine).toBeInTheDocument();

    // Check if image has correct URL
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://test-image.jpg");

    // Check if "Read More" link has correct URL
    const link = screen.getByText(/Read More/i);
    expect(link).toHaveAttribute("href", "https://test-news-url.com");
  });

  test("displays fallback image when imageUrl is not provided", () => {
    const propsWithoutImage = { ...mockProps, imageUrl: null };
    render(<NewsItem {...propsWithoutImage} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", expect.stringContaining("gsmarena"));
  });

  test('displays "Unknown" when author is not provided', () => {
    const propsWithoutAuthor = { ...mockProps, author: null };
    render(<NewsItem {...propsWithoutAuthor} />);

    expect(screen.getByText(/By Unknown/i)).toBeInTheDocument();
  });
});
