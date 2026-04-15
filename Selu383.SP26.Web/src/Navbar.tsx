import { Group, Text, Button } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

type CurrentUser = {
  id: number;
  userName: string;
  roles: string[];
};

type NavbarProps = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

function Navbar({ currentUser, setCurrentUser }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/authentication/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setCurrentUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "10px 20px",
        borderRadius: "25px",
        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.4)",
        marginBottom: "20px",
      }}
    >
      <Group mih={50} gap="md" justify="space-between" wrap="wrap">
        <h2 style={{ margin: 0 }}>Caffeinated Lions</h2>

        <Group gap="sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Text style={{ padding: "10px" }}>Home</Text>
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Text style={{ padding: "10px" }}>Menu</Text>
          </NavLink>

          <NavLink
            to="/orders"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Text style={{ padding: "10px" }}>Orders</Text>
          </NavLink>

          <NavLink
            to="/reservations"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Text style={{ padding: "10px" }}>Reservations</Text>
          </NavLink>
        </Group>

        <Group gap="sm">
          {currentUser ? (
            <>
              <Text fw={600}>Hi, {currentUser.userName}</Text>
              <Button
                variant="outline"
                color="dark"
                radius="md"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Text style={{ padding: "10px" }}>Login</Text>
            </NavLink>
          )}
        </Group>
      </Group>
    </div>
  );
}

export default Navbar;