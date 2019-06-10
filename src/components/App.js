import React, { Component } from "react";
import Header from "./Header";
import "../index.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Gallery from "./Gallery";
import axios from "axios";
import apiKey from "../config";

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
    return (
      <BrowserRouter>
        <div className="container">
          <Header handleSearch={this.handleSearch}/>
          <Route exact path="/" render={() => <Redirect to="/cats" />} />
          <Route
            path="/cats"
            render={({location}) => <Gallery title="Cats" photos={this.state.catsData} location={location} fetchSearchImages={this.handleSearch} />}
          />
          <Route
            path="/dogs"
            render={({location}) => <Gallery title="Dogs" photos={this.state.dogsData} location={location} fetchSearchImages={this.handleSearch} />}
          />
          <Route
            path="/birds"
            render={({location}) => (
              <Gallery title="Birds" photos={this.state.birdsData} location={location} fetchSearchImages={this.handleSearch} />
            )}
          />

          <Route
            path="/search"
            render={({location}) => (
              <Gallery title="Results" photos={this.state.searchData} location={location} fetchSearchImages={this.handleSearch}/>
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
