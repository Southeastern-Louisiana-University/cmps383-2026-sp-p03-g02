import React from "react";
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <div className="left">
                <Link to="/" className="title">Caffeinated Lions</Link>
            </div>
            <ul>
                <li><NavLink to="/menu">Menu</NavLink></li>
                <li><NavLink to="/orders">Orders</NavLink></li>
                <li><NavLink to="reservations">Reservations</NavLink></li>
            </ul>
            <div className="right">
                <NavLink to="/login" className="login">Login</NavLink>
            </div>
        </nav>
    )
};

export default Navbar;