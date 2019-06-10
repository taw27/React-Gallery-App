import React, { Component } from "react";
import "../index.css";
import { Route, Redirect, Switch } from "react-router-dom";
import axios from "axios";
import apiKey from "../config";
import Proptypes from "prop-types";
import queryString from "query-string";
import Gallery from "./Gallery";
import Header from "./Header";
import MessageLi from "./MessageLi";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: [],
      catsData: [],
      dogsData: [],
      birdsData: [],
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

    const { location } = this.props;
    const values = queryString.parse(location.search);

    if (values.query) {
      console.log(values.query);
      this.handleSearch(values.query);
    }
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
      console.log("here");
      this.setState({ searchData: photos});
    });
  };

  render() {
    const errorTitle = "404 Not Found";
    const errorMessage = "Requested Page Not Found";

    return (
        <div className="container">
          <Header handleSearch={this.handleSearch} />

          <Switch>
            <Route exact path="/" render={() => <Redirect to="/cats" />} />
            <Route
              path="/search"
              render={({ location }) => {
                const isCorrectQuery= queryString.parse(location.search).query;
                  return isCorrectQuery ? (
                    <Gallery
                      title="Search Results"
                      photos={this.state.searchData}
                      location={location}
                      fetchSearchImages={this.handleSearch}
                    />
                  ) : (
                    <ul>
                      <MessageLi
                        messageTitle={errorTitle}
                        messageText={errorMessage}
                      />
                    </ul>
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
                  <ul>
                    <MessageLi
                      messageTitle={errorTitle}
                      messageText={errorMessage}
                    />
                  </ul>
                );
              }}
            />

            <Route
              render={() => (
                <ul>
                  <MessageLi
                    messageTitle={errorTitle}
                    messageText={errorMessage}
                  />
                </ul>
              )}
            />
          </Switch>
        </div>
    );
  }
}

App.propTypes = {
  location: Proptypes.object,
};

export default App;
