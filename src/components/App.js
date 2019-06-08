import React, {Component} from "react";
import Header from "./Header";
import "../index.css";
import {BrowserRouter} from "react-router-dom"

class App extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header></Header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
