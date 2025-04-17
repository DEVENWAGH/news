import fetchNewsFromApi from "../proxy/newsApiProxy";
import axios from "axios";

// Mock axios
jest.mock("axios");

describe("News API Proxy", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test("fetches news data successfully", async () => {
    // Mock successful response
    const mockResponse = {
      data: {
        status: "ok",
        totalResults: 2,
        articles: [
          {
            title: "Test Article 1",
            description: "Test Description 1",
          },
          {
            title: "Test Article 2",
            description: "Test Description 2",
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    // Call the function
    const result = await fetchNewsFromApi("top-headlines", { country: "us" });

    // Check axios was called correctly
    expect(axios.get).toHaveBeenCalledWith(
      "https://newsapi.org/v2/top-headlines",
      {
        params: {
          country: "us",
          apiKey: process.env.REACT_APP_NEWS_API,
        },
        headers: {
          "X-Api-Key": process.env.REACT_APP_NEWS_API,
        },
      }
    );

    // Check returned data
    expect(result).toEqual(mockResponse.data);
  });

  test("handles errors during API calls", async () => {
    // Mock error
    const errorMessage = "Network Error";
    const error = new Error(errorMessage);
    axios.get.mockRejectedValue(error);

    // Mock console.error
    console.error = jest.fn();

    // Call the function and expect it to throw
    await expect(
      fetchNewsFromApi("top-headlines", { country: "us" })
    ).rejects.toThrow(errorMessage);

    // Verify error was logged
    expect(console.error).toHaveBeenCalled();
  });
});
