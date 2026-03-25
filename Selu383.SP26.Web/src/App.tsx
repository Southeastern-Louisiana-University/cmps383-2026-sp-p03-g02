import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Home from "./compnents/Home.tsx";
import Menu from "./compnents/Menu.tsx";
import Orders from "./compnents/Orders.tsx";
import "./App.css";
import { AppShell, Flex } from "@mantine/core";
import { useRef } from "react";

import beans from "./assets/beans.jpg";

function App() {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <AppShell>
        <AppShell.Header
          ref={headerRef}
          style={{
            display: "grid",
            justifyContent: "center",
            padding: "20px",
            position: "relative",
            backgroundImage: `url(${beans})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "25px",
          }}
        >
          <Navbar />
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
              element={
                <div>
                  <h1>Login Page</h1>
                  <p>Coming soon...</p>
                </div>
              }
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
