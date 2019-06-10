import React, { Component } from "react";
import "../index.css";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import apiKey from "../config";
import queryString from "query-string";
import Gallery from "./Gallery";
import Header from "./Header";
import NoResults from "./NoResults";


class App extends Component {
  constructor() {
    super();

    this.state = {
      searchData: [],
      catsData: [],
      dogsData: [],
      birdsData: []
    };
  }

  componentDidMount() {
    this.fetchPhotos("cat").then(photos => this.setState({ catsData: photos }));
    this.fetchPhotos("dogs").then(photos =>
      this.setState({ dogsData: photos })
    );
    this.fetchPhotos("birds").then(photos =>
      this.setState({ birdsData: photos })
    );
  }

  fetchPhotos = async searchTag => {
    const response = await axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&format=json&nojsoncallback=1&per_page=24`
    );
    const { data } = await response;
    return data.photos.photo;
  };

  handleSearch = searchTerm => {
    this.fetchPhotos(searchTerm).then(photos => {
      this.setState({ searchData: photos });
    });
  };

  render() {
    const errorTitle = "404 Not Found";
    const errorMessage = "Requested Page Not Found";

    return (
      <BrowserRouter>
        <div className="container">
          <Header handleSearch={this.handleSearch} />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cats" />} />

            <Route
              path="/search"
              render={({ location }) => {
                return queryString.parse(location.search).query ? (
                  <Gallery
                    title="Search Results"
                    photos={this.state.searchData}
                    location={location}
                    fetchSearchImages={this.handleSearch}
                  />
                ) : (
                  <NoResults
                    errorTitle={errorTitle}
                    errorMessage={errorMessage}
                  />
                );
              }}
            />

            <Route
              path="/:defaultRoute"
              render={({ location, match }) => {
                const routeParam = match.params.defaultRoute.toLowerCase();
                return routeParam === "cats" ||
                  routeParam === "dogs" ||
                  routeParam === "birds" ? (
                  <Gallery
                    title={routeParam[0].toUpperCase() + routeParam.slice(1)}
                    photos={this.state[`${routeParam}Data`]}
                    location={location}
                    fetchSearchImages={this.handleSearch}
                  />
                ) : (
                  <NoResults
                    errorTitle={errorTitle}
                    errorMessage={errorMessage}
                  />
                );
              }}
            />

            <Route
              render={() => (
                <NoResults
                  errorTitle={errorTitle}
                  errorMessage={errorMessage}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
