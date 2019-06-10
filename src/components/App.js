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

    // application state
    this.state = {
      searchData: [],
      catsData: [],
      dogsData: [],
      birdsData: [],
      isLoading: false
    };
  }

  /* 
  fetches all the required data on on Component Mount
   */
  componentDidMount() {
    // sets the isLoading state to true
    this.setState({ isLoading: true });

    /* 
      fetches default data and sets isLoading to false once all of the data is retreived
     */
    Promise.all([
      this.fetchPhotos("cat").then(photos =>
        this.setState({ catsData: photos })
      ),
      this.fetchPhotos("dogs").then(photos =>
        this.setState({ dogsData: photos })
      ),
      this.fetchPhotos("birds").then(photos =>
        this.setState({ birdsData: photos })
      )
    ]).then(() => {
      this.setState({ isLoading: false });
    });

    const { location } = this.props;
    const values = queryString.parse(location.search);

    if (values.query) {
      this.handleSearch(values.query);
    }
  }

  /* 
   Reurns a photos array with data from the flickr api based on the searchTag
   */
  fetchPhotos = async searchTag => {
    const response = await axios.get(
      `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&format=json&nojsoncallback=1&per_page=24`
    );
    const { data } = await response;
    return data.photos.photo;
  };

  /*
    Retreives data for the searchData state based on searchTerm
   */
  handleSearch = searchTerm => {
    this.setState({ isLoading: true });
    this.fetchPhotos(searchTerm).then(photos => {
      this.setState({ searchData: photos, isLoading: false });
    });
  };

  render() {
    const errorTitle = "404 Not Found";
    const errorMessage = "Requested Page Not Found";

    return (
      <div className="container">
        <Header handleSearch={this.handleSearch} />
        {/* 
        Renders the Loading indicator if isLoading state is true else lrenders based on routes
         */}
        {this.state.isLoading ? (
          <ul>
            <MessageLi
              messageTitle="Loading..."
              messageText="Fetching Images"
            />
          </ul>
        ) : (
          <Switch>
            {/* Redirect t0 /cats route */}
            <Route exact path="/" render={() => <Redirect to="/cats" />} />
            <Route exact path="/Search" render={() => <Redirect to="/" />} />

            {/* Renders the gallery eith searchData passed in if correct query parameter matches else renders 404 message */}
            <Route
              path="/search/all"
              render={({ location }) => {
                const isCorrectQuery = queryString.parse(location.search).query;
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

            {/* Renders default route if parameter matches else renders 404 message */}
            <Route
              exact
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
            {/* Renders 404 message if no other routes match */}
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
        )}
      </div>
    );
  }
}

// props validations
App.propTypes = {
  location: Proptypes.object
};

export default App;
