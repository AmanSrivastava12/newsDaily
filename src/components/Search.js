import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Search(props) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [sortOrder, setSortOrder] = useState("publishedAt");
  const pageSize = 9;
  // window.onload = function () {
  //   window.location = "/search";
  // };
  let {
    setProgress,
    bgStyle,
    fnStyle1,
    fnStyle2,
    fnStyle3,
    bdStyle,
    apiKey,
    inpField,
    callEveApi,
    setCallEveApi,
  } = props;

  useEffect(() => {
    (async () => {
      setProgress(0);
      let everyendpoint = `https://newsapi.org/v2/everything?q=${inpField}&language=en&sortBy=${sortOrder}&pageSize=${pageSize}&page=${pageNumber}&apiKey=${apiKey}`;
      setLoading({ loading: true });
      let data = await fetch(everyendpoint);
      setProgress(50);
      let parsedData = await data.json();
      setProgress(75);
      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
      setCallEveApi(false);
    })();
  }, [callEveApi]);

  const fetchMoreData = async () => {
    let everyendpoint = `https://newsapi.org/v2/everything?q=${inpField}&language=en&sortBy=${sortOrder}&pageSize=${pageSize}&page=${
      pageNumber + 1
    }&apiKey=${apiKey}`;
    let data = await fetch(everyendpoint);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalArticles(totalArticles > 99 ? 99 : totalArticles);
    // setTotalArticles(parsedData.totalResults);
    setPageNumber(pageNumber + 1);
  };

  const handleFilter = (filter) => {
    setSortOrder(filter);
    (async () => {
      setProgress(0);
      let everyendpoint = `https://newsapi.org/v2/everything?q=${inpField}&language=en&sortBy=${sortOrder}&pageSize=${pageSize}&page=${pageNumber}&apiKey=${apiKey}`;
      setLoading({ loading: true });
      let data = await fetch(everyendpoint);
      setProgress(50);
      let parsedData = await data.json();
      setProgress(75);
      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    })();
  };
  return (
    <>
      <div className="container d-flex justify-content-between mt-5">
        <div className="headingbody d-flex">
          <h2 style={fnStyle2}>NewsDaily</h2>
          <h2
            className="dash"
            style={{
              marginTop: "-5px",
            }}
          >
            &nbsp;-&nbsp;
          </h2>
          <h2 style={fnStyle1}>Search Results for '{inpField}'</h2>
        </div>
        <h5
          className="btn"
          style={bgStyle}
          onClick={() => {
            let filterlabels = document.getElementById("labels");
            if (filterlabels.classList.contains("d-none")) {
              filterlabels.classList.remove("d-none");
              filterlabels.classList.add("d-block");
            } else {
              filterlabels.classList.remove("d-block");
              filterlabels.classList.add("d-none");
            }
          }}
        >
          Filter By
        </h5>
      </div>
      <div className="" style={{ minHeight: "30px" }}>
        <div
          className="text-end d-none"
          id="labels"
          style={{ marginRight: "78px" }}
        >
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="publishedAt"
            autoComplete="off"
            // checked={this.id === sortOrder}
          />
          <label
            className="badge text-bg-dark mx-1"
            htmlFor="publishedAt"
            onClick={(e) => handleFilter(e.target.htmlFor)}
            style={{ cursor: "pointer" }}
          >
            Published At
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="relevancy"
            autoComplete="off"
          />
          <label
            className="badge text-bg-dark mx-1"
            htmlFor="relevancy"
            onClick={(e) => handleFilter(e.target.htmlFor)}
            style={{ cursor: "pointer" }}
          >
            Relevancy
          </label>
          <input
            type="radio"
            className="btn-check"
            name="options"
            id="popularity"
            autoComplete="off"
          />
          <label
            className="badge text-bg-dark mx-1"
            htmlFor="popularity"
            onClick={(e) => handleFilter(e.target.htmlFor)}
            style={{ cursor: "pointer" }}
          >
            Popularity
          </label>
        </div>
      </div>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
      >
        <div className="container mb-5">
          <div className="row">
            {articles.map((element) => {
              return (
                <div
                  className="col-md-4 my-4 d-flex justify-content-center"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 55) : ""}
                    desc={
                      element.description
                        ? element.description.slice(0, 120)
                        : ""
                    }
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    pubDt={element.publishedAt}
                    source={element.source.name}
                    bgStyle={bgStyle}
                    fnStyle3={fnStyle3}
                    bdStyle={bdStyle}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

Search.defaultProps = {
  country: "in",
  category: "general",
  heading: "Top Headlines",
};
Search.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  heading: PropTypes.string,
};
