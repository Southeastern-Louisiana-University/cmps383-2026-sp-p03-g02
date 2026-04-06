import React from "react";
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <Link to="/" className="title">Caffeinated Lions</Link>
            <ul>
                <li><NavLink to="/menu">Menu</NavLink></li>
                <li><NavLink to="/orders">Orders</NavLink></li>
                <li><NavLink to="reservations">Reservations</NavLink></li>
                {/* <li><NavLink to="login">Login</NavLink></li> */}
            </ul>
            <NavLink to="/login" className="login">Login</NavLink>
        </nav>
    )
};

export default Navbar;