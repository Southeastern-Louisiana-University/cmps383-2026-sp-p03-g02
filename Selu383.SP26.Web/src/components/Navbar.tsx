import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Center, Flex } from "@mantine/core";

const Navbar = () => {
  return (
    <nav>
      <Flex style={{marginLeft: 30}}>
        <div className="left">
          <Link to="/" className="title">
            Caffeinated Lions
          </Link>
        </div>
        <Flex align="center">
          <ul style={{padding: 0}}>
            <li>
              <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
            </li>
            <li>
              <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>Orders</NavLink>
            </li>
            <li>
              <NavLink to="reservations" className={({ isActive }) => isActive ? "active" : ""}>Reservations</NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Cart</NavLink>
            </li>
          </ul>
        </Flex>
      </Flex>
      <div className="right">
        <NavLink to="/login" className="login">
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
