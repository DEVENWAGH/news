import axios from "axios";

const fetchNewsFromApi = async (endpoint, params) => {
  try {
    // You could use a backend proxy server URL here instead
    const response = await axios.get(`https://newsapi.org/v2/${endpoint}`, {
      params: {
        ...params,
        apiKey: process.env.REACT_APP_NEWS_API,
      },
      headers: {
        "X-Api-Key": process.env.REACT_APP_NEWS_API,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

export default fetchNewsFromApi;
