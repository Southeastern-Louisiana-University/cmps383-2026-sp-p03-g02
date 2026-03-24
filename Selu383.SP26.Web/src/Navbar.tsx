import { Group } from "@mantine/core";
import { NavLink } from "react-router-dom";
import { Text } from "@mantine/core";
import "./Navbar.css";

function Navbar() {

  return (
    <div
      style={{
        width: "75vw",
        backgroundColor: "rgba(0, 0, 0, .3)",
        padding: "10px",
        borderRadius: "25px",
        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.4)",
        marginBottom: "20px",
      }}
    >
      <Group mih={50} gap="md" justify="space-between" wrap="wrap">
        <h2> Caffeinated Lions </h2>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text style={{ padding: "10px" }}>Home</Text>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text style={{ padding: "10px" }}>Menu</Text>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text style={{ padding: "10px" }}>Orders</Text>
        </NavLink>
        <NavLink
          to="/reservations"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text style={{ padding: "10px" }}>Reservations</Text>
        </NavLink>
        <p></p>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Text style={{ padding: "10px" }}>Login</Text>
        </NavLink>
        <p></p>
      </Group>
    </div>
  );
}

export default Navbar;
