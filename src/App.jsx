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

// 1. Import Toastify component and CSS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductProvider from "./contexts/ProductContext";
import Products from "./pages/Products";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <ProductProvider>
          <Nav />
          <Routes>
            <Route path="/product" element={<Products/>}/>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-product" element={<CreateProducts />} />
            <Route path="/profile" element={<Profile/>}/>
          </Routes>

          {/* 2. Place ToastContainer inside your provider so it is globally active */}
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          </ProductProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;