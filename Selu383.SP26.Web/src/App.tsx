import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./compnents/Home.tsx";
import Menu from "./compnents/Menu.tsx";
import Orders from "./compnents/Orders.tsx";
import "./App.css";
import { AppShell, Flex } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import beans from "./assets/beans.jpg";
import Login from "./compnents/Login.tsx";

type CurrentUser = {
  id: number;
  userName: string;
  roles: string[];
};

function App() {
  const headerRef = useRef<HTMLDivElement>(null);
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
      <AppShell>
        <AppShell.Header
          ref={headerRef}
          style={{
            width: "70vw",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            height: "120px",
            position: "relative",
            backgroundImage: `url(${beans})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "25px",
          }}
        >
          <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </AppShell.Header>

        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route
              path="/reservations"
              element={
                <div>
                  <h1>Reservations Page</h1>
                  <p>Coming soon...</p>
                </div>
              }
            />
            <Route
              path="/login"
              element={<Login setCurrentUser={setCurrentUser} />}
            />
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
            <p style={{ margin: 0 }}>
              © 2026 Caffeinated Lions. All rights reserved.
            </p>
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export default App;