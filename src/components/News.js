import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isError, setIsError] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Sample news data to use as fallback
  const getSampleNews = () => {
    return {
      status: "ok",
      totalResults: 4,
      articles: [
        {
          source: { id: "news24", name: "News24" },
          author: "Sibusiso Mjikeliso",
          title:
            "Cricket SA wants to 'get to the bottom' of Nkwe resignation concerns, says CEO | Sport",
          description:
            "Acting Cricket South Africa CEO Pholetsi Moseki says the board is concerned about the issues former Proteas assistant coach Enoch Nkwe raised in his resignation.",
          url: "https://www.news24.com/sport/Cricket/Proteas/cricket-sa-wants-to-get-to-the-bottom-of-nkwe-resignation-concerns-says-ceo-20210826",
          urlToImage:
            "https://cdn.24.co.za/files/Cms/General/d/10743/97d776dc91734e98906c0e1b7f3b1afa.jpg",
          publishedAt: "2021-08-26T11:40:16+00:00",
          content:
            '<ul><li>Cricket South Africa has committed to "getting to the bottom" of Enoch Nkwe\'s sudden resignation as Proteas assistant coach. </li><li>Nkwe voiced concerns with the current culture and working environment.</li></ul>',
        },
        {
          source: { id: "abc-news-au", name: "ABC News (AU)" },
          author: "ABC News",
          title: "England cricket great Ted Dexter dies aged 86",
          description:
            'The former England captain, nicknamed "Lord Ted", is fondly remembered as a giant of the game and one of his country\'s greatest players.',
          url: "http://www.abc.net.au/news/2021-08-26/england-cricket-great-ted-dexter-dies-aged-86/100411276",
          urlToImage:
            "https://live-production.wcms.abc-cdn.net.au/1006c7ecf34ec0935eef2aade5017711?impolicy=wcms_crop_resize&cropH=2815&cropW=5004&xPos=0&yPos=223&width=862&height=485",
          publishedAt: "2021-08-26T09:07:52Z",
          content:
            "Former England captain Ted Dexter has died aged 86 following a recent illness.",
        },
        {
          source: { id: "espn-cric-info", name: "ESPN Cric Info" },
          author: "ESPN Staff",
          title:
            "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          description:
            "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          urlToImage:
            "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          publishedAt: "2020-04-27T11:41:47Z",
          content:
            "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report details of corrupt approaches.",
        },
      ],
    };
  };

  const updateNews = async () => {
    props.setProgress(10);
    // Use the 'everything' endpoint instead of 'top-headlines' with more flexible parameters
    const url = `https://newsapi.org/v2/everything?q=${props.category}&sortBy=publishedAt&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    try {
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);

      console.log("API Response:", parsedData); // Add this to see the actual response

      // Check if API returned an error
      if (parsedData.status === "error") {
        console.error("News API error:", parsedData.message);
        setIsError(true);
        // Use sample data as fallback
        const sampleData = getSampleNews();
        setArticles(sampleData.articles);
        setTotalResults(sampleData.totalResults);
      } else {
        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults || 0);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setIsError(true);
      // Use sample data as fallback
      const sampleData = getSampleNews();
      setArticles(sampleData.articles);
      setTotalResults(sampleData.totalResults);
      setLoading(false);
    }
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(
      props.category
    )} - Nation Insight`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    if (isError) {
      // If we're using sample data, don't try to fetch more
      return;
    }

    const url = `https://newsapi.org/v2/everything?q=${
      props.category
    }&sortBy=publishedAt&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${
      props.pageSize
    }`;
    setPage(page + 1);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();

      if (parsedData.status === "error") {
        console.error("News API error on fetchMoreData:", parsedData.message);
        return;
      }

      setArticles(articles.concat(parsedData.articles || []));
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "20px 0 35px" }} // Updated margin to better fit new layout
      >
        Nation Insight - Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>

      {isError && (
        <div className="container text-center alert alert-warning">
          <p>
            There was an issue connecting to the News API. Showing sample news
            instead.
          </p>
          <p>
            Note: Free News API keys only work in development, not in
            production.
          </p>
        </div>
      )}

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={!isError && articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => {
              return (
                <div className="col-md-4" key={element.url || index}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source ? element.source.name : "Unknown"}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
