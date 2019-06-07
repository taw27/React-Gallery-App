import React from "react";

const Header = (props) => (
    <h1>{props.title}</h1>
);

Header.propTypes = {
    title: "Reeact Gallery App"
}
export default Header;