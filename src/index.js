import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/App";

/* Wraps the App in Browser router for routing and renders it*/
ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App} />
  </BrowserRouter>,
  document.getElementById("root")
);
