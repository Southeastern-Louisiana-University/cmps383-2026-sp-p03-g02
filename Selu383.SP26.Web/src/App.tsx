import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import Orders from "./pages/Orders.tsx";
import Reservations from "./pages/Reservations.tsx";
import Cart from "./pages/Cart.tsx";
import "./App.css";
import { AppShell, Flex } from "@mantine/core";
import '@mantine/carousel/styles.css';
import { useEffect, useState } from "react";

// import beans from "./assets/beans.jpg";
import Login from "./pages/Login.tsx";

type CurrentUser = {
  id: number;
  userName: string;
  roles: string[];
};

function App() {
  // const headerRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/api/authentication/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data: CurrentUser = await response.json();
          setCurrentUser(data);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Failed to get current user:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <AppShell header={{ height: 70 }} footer={{ height: 100 }}>
        <AppShell.Header>
          {/* <Navbar /> */}
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        
        </AppShell.Header>
        <AppShell.Main style={{paddingLeft: 100, paddingRight: 100}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppShell.Main>

        <AppShell.Footer
          style={{
            position: "relative",
          }}
        >
          <Flex
            style={{
              marginTop: "20px",
              padding: "10px",
              justifyContent: "center",
            }}
          >
            <Footer />
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export default App;