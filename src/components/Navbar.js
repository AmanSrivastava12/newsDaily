import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const emptyInpVal = () => {
    document.getElementById("searchitems").value = "";
  };

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchNews(e.target.value);
    }
  };
  const searchNewsClick = () => {
    searchNews(document.getElementById("searchitems").value);
  };
  const searchNews = (text) => {
    if (text) {
      props.receiveInpField(text);
      props.setCallEveApi(true);
      emptyInpVal();
    } else {
      alert(
        "Please type something in the search box first.\nRedirecting you to home page..."
      );
      window.location = "/";
    }
  };
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg py-3"
        style={props.bgStyle}
      >
        <div className="container-fluid mx-3">
          <div className="navbar-brand" style={props.fnStyle2}>
            NewsDaily
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  style={props.fnStyle1}
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={props.fnStyle1}
                  to="/business"
                >
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={props.fnStyle1}
                  to="/entertainment"
                >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={props.fnStyle1} to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={props.fnStyle1} to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={props.fnStyle1} to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={props.fnStyle1}
                  to="/technology"
                >
                  Technology
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2 mx-2"
                id="searchitems"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onKeyDown={onKeyDownHandler}
                autoComplete="off"
              />
              <Link
                className="btn btn-outline-success"
                type="submit"
                onClick={searchNewsClick}
                to="/search"
              >
                Search
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
