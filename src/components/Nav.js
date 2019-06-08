import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li> <NavLink to="/cat"> Cats </NavLink> </li>
            <li> <NavLink to="/dog"> Dogs </NavLink> </li>
            <li> <NavLink to="/birds"> Birds </NavLink> </li>
        </ul>
    </nav>
);

export default Nav;