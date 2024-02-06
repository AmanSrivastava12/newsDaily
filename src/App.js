import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Search from "./components/Search";
import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router-dom";

function App() {
  // const navigate = useNavigate();
  // window.onload = function () {
  // navigate("/home");
  // window.location = "/";
  // };
  let apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
  const [inpField, setInpField] = useState("");
  const [callEveApi, setCallEveApi] = useState(false);
  let bgStyle = {
    backgroundColor: "#f29518",
  };
  let fnStyle1 = {
    fontFamily: "'Electrolize', sans-serif",
    fontWeight: "bold",
  };
  let fnStyle2 = {
    fontFamily: "'Tillana', cursive",
    fontWeight: "bold",
  };
  let fnStyle3 = {
    fontFamily: "'Zilla Slab', serif",
    fontWeight: "bold",
  };
  let bdStyle = {
    border: "1px solid #f29518",
  };
  const receiveInpField = (inpField) => {
    setInpField(inpField);
  };
  return (
    <div className="App">
      <Router>
        <LoadingBar color="#000000" height="2px" progress={progress} />
        <Navbar
          bgStyle={bgStyle}
          fnStyle1={fnStyle1}
          fnStyle2={fnStyle2}
          receiveInpField={receiveInpField}
          setCallEveApi={setCallEveApi}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="general"
                category="general"
                heading="Top Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/business"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="business"
                category="business"
                heading="Business Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/entertainment"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="entertainment"
                category="entertainment"
                heading="Entertainment Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/health"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="health"
                category="health"
                heading="Health Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/science"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="science"
                category="science"
                heading="Science Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/sports"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="sports"
                category="sports"
                heading="Sports Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/technology"
            element={
              <News
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                key="technology"
                category="technology"
                heading="Technology Headlines"
                country="in"
              />
            }
          />
          <Route
            exact
            path="/search"
            element={
              <Search
                setProgress={setProgress}
                bgStyle={bgStyle}
                fnStyle1={fnStyle1}
                fnStyle2={fnStyle2}
                fnStyle3={fnStyle3}
                bdStyle={bdStyle}
                apiKey={apiKey}
                inpField={inpField}
                callEveApi={callEveApi}
                setCallEveApi={setCallEveApi}
                key="search"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
