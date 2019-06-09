import React, {Component} from "react";
import Header from "./Header";
import "../index.css";
import {BrowserRouter, Route, Redirect} from "react-router-dom"
import Gallery from "./Gallery";
import axios from "axios";
import apiKey from '../config';

class App extends Component {
  constructor(){
    super();

    this.state = {
      searchData: [],
      catsData: [],
      dogsData: [],
      birdsData: []
    }
  }

  componentDidMount(){
    this.fetchPhotos("cat").then((photos) => this.setState({catsData: photos}));
    this.fetchPhotos("dogs").then((photos) => this.setState({dogsData: photos}));
    this.fetchPhotos("birds").then((photos) => this.setState({birdsData: photos}));
  }

  async fetchPhotos(searchTag){
    const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchTag}&format=json&nojsoncallback=1&per_page=24`);
    const {data} =  await response;
    return data.photos.photo;
  }

  render(){
    return (
      <BrowserRouter>
        <div className="container">
          <Header></Header>
          <Route exact path="/" render={() => (<Redirect to="/cats"></Redirect>)}></Route>
          <Route path="/cats" render={() => (<Gallery title="Cats" photos={this.state.catsData}></Gallery>)}></Route>
          <Route path="/dogs" render={() => (<Gallery title="Dogs" photos={this.state.dogsData}></Gallery>)}></Route>
          <Route path="/birds" render={() => (<Gallery title="Birds" photos={this.state.birdsData}></Gallery>)}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
