import React, { useState } from "react";
import Nav from "./components/Nav";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateProducts from "./pages/CreateProducts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Landingpage from "./pages/Landingpage";
import AuthProvider from "./contexts/AuthContext";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <Router>
       

        <AuthProvider>
           <Nav />
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-product" element={<CreateProducts />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
