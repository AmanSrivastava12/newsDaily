import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
    heading: "Top Headlines",
  };
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    heading: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageSize: 15,
      loading: true,
      pageNumber: 1,
      totalArticles: 0,
    };
  }
  async componentDidMount() {
    this.props.setProgress(0);
    let topendpoint = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${this.state.pageNumber}&apiKey=${this.props.apiKey}`;
    this.setState({ loading: true });
    let data = await fetch(topendpoint);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(75);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    let topendpoint = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${
      this.state.pageNumber + 1
    }&apiKey=${this.props.apiKey}`;
    let data = await fetch(topendpoint);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      pageNumber: this.state.pageNumber + 1,
    });
  };

  render() {
    return (
      <>
        <div className="headingbody container d-flex mt-5 mb-3">
          <h2 style={this.props.fnStyle1}>{this.props.heading}</h2>
          <h2
            className="dash"
            style={{
              marginTop: "-5px",
            }}
          >
            &nbsp;-&nbsp;
          </h2>
          <h2 style={this.props.fnStyle2}>NewsDaily</h2>
        </div>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />}
        >
          <div className="container mb-5">
            <div className="row">
              {this.state.articles.map((element) => {
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
                      bgStyle={this.props.bgStyle}
                      fnStyle3={this.props.fnStyle3}
                      bdStyle={this.props.bdStyle}
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
}

export default News;

// handlePrevClick = async () => {
//   let topendpoint = `https://newsapi.org/v2/top-headlines?country=${
//     this.props.country
//   }&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${
//     this.state.pageNumber - 1
//   }&apiKey=${this.props.apiKey}`;
//   this.setState({ loading: true });
//   let data = await fetch(topendpoint);
//   let parsedData = await data.json();
//   this.setState({
//     pageNumber: this.state.pageNumber - 1,
//     articles: parsedData.articles,
//     loading: false,
//   });
// };
// handleNextClick = async () => {
//   if (
//     this.state.pageNumber + 1 <=
//     Math.ceil(this.state.totalArticles / this.state.pageSize)
//   ) {
//     let topendpoint = `https://newsapi.org/v2/top-headlines?country=${
//       this.props.country
//     }&category=${this.props.category}&pageSize=${this.state.pageSize}&page=${
//       this.state.pageNumber + 1
//     }&apiKey=${this.props.apiKey}`;
//     this.setState({ loading: true });
//     let data = await fetch(topendpoint);
//     let parsedData = await data.json();
//     this.setState({
//       pageNumber: this.state.pageNumber + 1,
//       articles: parsedData.articles,
//       loading: false,
//     });
//   }
// };
// {
//    <div className="container my-5">
//           <div className="d-flex justify-content-between">
//             <button
//               disabled={this.state.pageNumber <= 1}
//               className="btn p-1"
//               style={this.props.bgStyle}
//               onClick={this.handlePrevClick}
//             >
//               &larr; Previous
//             </button>
//             <div>Results Per Page</div>
//             <button
//               disabled={
//                 this.state.pageNumber + 1 >
//                 Math.ceil(this.state.totalArticles / this.state.pageSize)
//               }
//               className="btn"
//               style={this.props.bgStyle}
//               onClick={this.handleNextClick}
//             >
//               Next &rarr;
//             </button>
//           </div>
//           <div className="d-flex flex-row justify-content-center">
//             <input
//               type="radio"
//               className="btn-check"
//               name="options"
//               id="option1"
//               autoComplete="off"
//               defaultChecked
//               onClick={() => {
//                 this.setState({ pageSize: 15, pageNumber: 1 });
//                 this.componentDidMount();
//               }}
//             />
//             <label
//               className="btn btn-sm mx-1"
//               htmlFor="option1"
//               style={this.props.bgStyle}
//             >
//               15
//             </label>
//             <input
//               type="radio"
//               className="btn-check"
//               name="options"
//               id="option2"
//               autoComplete="off"
//               onClick={() => {
//                 this.setState({ pageSize: 30, pageNumber: 1 });
//                 this.componentDidMount();
//               }}
//             />
//             <label
//               className="btn btn-sm mx-1"
//               htmlFor="option2"
//               style={this.props.bgStyle}
//             >
//               30
//             </label>
//             <input
//               type="radio"
//               className="btn-check"
//               name="options"
//               id="option3"
//               autoComplete="off"
//               onClick={() => {
//                 this.setState({ pageSize: 45, pageNumber: 1 });
//                 this.componentDidMount();
//               }}
//             />
//             <label
//               className="btn btn-sm mx-1"
//               htmlFor="option3"
//               style={this.props.bgStyle}
//             >
//               45
//             </label>
//             <input
//               type="radio"
//               className="btn-check"
//               name="options"
//               id="option4"
//               autoComplete="off"
//               onClick={() => {
//                 this.setState({ pageSize: 60, pageNumber: 1 });
//                 this.componentDidMount();
//               }}
//             />
//             <label
//               className="btn btn-sm mx-1"
//               htmlFor="option4"
//               style={this.props.bgStyle}
//             >
//               60
//             </label>
//           </div>
//         </div>
// }
