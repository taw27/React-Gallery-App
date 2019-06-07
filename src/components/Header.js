import React from "react";
import Proptypes from "prop-types";

const Header = (props) => (
    <h1>{props.title}</h1>
);

Header.defaultProps = {
    title: "Reeact Gallery App"
}

Header.propTypes = {
    title: Proptypes.string
}
export default Header;