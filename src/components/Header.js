import React from "react";
import Proptypes from "prop-types";
import Nav from "./Nav";
import Search from "./Search";

const Header = ({title, handleSearch}) => (
  <div>
    <h1>{title}</h1>
    <Search handleSearch={handleSearch}></Search>
    <Nav />
  </div>
);

Header.defaultProps = {
  title: "Reeact Gallery App"
};

Header.propTypes = {
  title: Proptypes.string,
  handleSearch: Proptypes.func
};
export default Header;
