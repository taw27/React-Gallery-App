import React from "react";
import Proptypes from "prop-types";
import Nav from "./Nav";

const Header = props => (
  <div>
    <h1>{props.title}</h1>
    <Nav />
  </div>
);

Header.defaultProps = {
  title: "Reeact Gallery App"
};

Header.propTypes = {
  title: Proptypes.string
};
export default Header;
