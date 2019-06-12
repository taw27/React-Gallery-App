import React from "react";
import Proptypes from "prop-types";
import Nav from "./Nav";
import Search from "./Search";

/* 
Renders titel, search and nav components
 */
const Header = ({ title, handleSearch }) => (
  <div>
    <h1>{title}</h1>
    <Search handleSearch={handleSearch} />
    <Nav />
  </div>
);

// Prop validations and defaults
Header.defaultProps = {
  title: "React Gallery App"
};

Header.propTypes = {
  title: Proptypes.string,
  handleSearch: Proptypes.func
};
export default Header;
