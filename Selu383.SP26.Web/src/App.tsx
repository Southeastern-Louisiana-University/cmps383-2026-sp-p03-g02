import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import Menu from "./pages/Menu.tsx";
import Orders from "./pages/Orders.tsx";
import Reservations from "./pages/Reservations.tsx";
import "./App.css";
import { AppShell, Flex } from "@mantine/core";
import { useRef } from "react";

// import beans from "./assets/beans.jpg";
import Login from "./pages/Login.tsx";

function App() {
  const headerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div>
      <Navbar />

      <AppShell>
        <AppShell.Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/login" element={<Login />} />
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
           <Footer/>
          </Flex>
        </AppShell.Footer>
      </AppShell>
    </div>
  );
}

export default App;
