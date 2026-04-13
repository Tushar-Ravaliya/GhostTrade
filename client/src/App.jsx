import React from "react";
import Login from "./pages/login";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Market from "./pages/Market";
import AboutUs from "./pages/AboutUs";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import StockDetails from "./pages/StockDetails";
import Layout from "./Layout";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="market" element={<Market />} />
            <Route path="about" element={<AboutUs />} />
            <Route element={<ProtectedRoute />}>
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="profile" element={<Profile />} />
              <Route path="history" element={<History />} />
            </Route>
            <Route path="stock/:symbol" element={<StockDetails />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

