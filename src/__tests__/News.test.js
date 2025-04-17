import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import News from "../components/News";

// Mock the sample news data
const mockNewsData = {
  status: "ok",
  totalResults: 2,
  articles: [
    {
      source: { id: "test-source", name: "Test Source" },
      author: "Test Author",
      title: "Test Title 1",
      description: "Test Description 1",
      url: "https://test-url-1.com",
      urlToImage: "https://test-image-1.jpg",
      publishedAt: "2023-05-15T12:30:45Z",
      content: "Test content 1",
    },
    {
      source: { id: "test-source-2", name: "Test Source 2" },
      author: "Test Author 2",
      title: "Test Title 2",
      description: "Test Description 2",
      url: "https://test-url-2.com",
      urlToImage: "https://test-image-2.jpg",
      publishedAt: "2023-05-15T14:30:45Z",
      content: "Test content 2",
    },
  ],
};

// Add article role to NewsItem component
jest.mock("../components/NewsItem", () => {
  return function MockNewsItem(props) {
    return (
      <div role="article" data-testid="news-item">
        <h5>{props.title}</h5>
        <p>{props.description}</p>
        <span>{props.source}</span>
        <img src={props.imageUrl} alt="news" />
        <a href={props.newsUrl}>Read More</a>
      </div>
    );
  };
});

// Mock Spinner component
jest.mock("../components/Spinner", () => {
  return function MockSpinner() {
    return (
      <div data-testid="spinner">
        <img src="loading.gif" alt="loading" />
      </div>
    );
  };
});

describe("News Component", () => {
  beforeEach(() => {
    // Mock the fetch response
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNewsData),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders news component with articles", async () => {
    const mockSetProgress = jest.fn();

    await act(async () => {
      render(
        <News
          setProgress={mockSetProgress}
          apiKey="test-api-key"
          category="general"
          pageSize={5}
          country="in"
        />
      );
    });

    // Check loading state immediately after render
    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    // Wait for articles to load
    await waitFor(() => {
      expect(
        screen.getByText("Nation Insight - Top General Headlines")
      ).toBeInTheDocument();
    });

    // Check that progress was called
    expect(mockSetProgress).toHaveBeenCalledWith(10);
    expect(mockSetProgress).toHaveBeenCalledWith(100);
  });

  test("handles API error and shows fallback data", async () => {
    // Mock fetch to throw an error
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject("API Error"));

    const mockSetProgress = jest.fn();

    await act(async () => {
      render(
        <News
          setProgress={mockSetProgress}
          apiKey="test-api-key"
          category="general"
          pageSize={5}
          country="in"
        />
      );
    });

    // Wait for error handling and fallback data
    await waitFor(() => {
      // Should show error message
      expect(
        screen.getByText(/There was an issue connecting to the News API/i)
      ).toBeInTheDocument();
    });
  });
});
