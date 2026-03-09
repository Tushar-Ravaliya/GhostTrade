import React from "react";
import Login from "./Pages/login";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import Market from "./Pages/Market";
import AboutUs from "./Pages/AboutUs";
import Portfolio from "./Pages/Portfolio";
import Profile from "./Pages/Profile";
import History from "./Pages/History";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";
import StockDetails from "./Pages/StockDetails";
import Layout from "./Layout";

export default function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/market" element={<Market />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/StockDatails" element={<StockDetails />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
