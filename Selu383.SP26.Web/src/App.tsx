import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Home from "./compnents/Home.tsx";
import Menu from "./compnents/Menu.tsx";
import Orders from "./compnents/Orders.tsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/menu"
          element={<Menu />}
        />
        <Route
          path="/orders"
          element={<Orders />}
        />
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
    </div>
  );
}

export default App