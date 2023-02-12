import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import RegisterSuccess from "./components/Auth/RegisterSuccess";
import Home from "./components/Home/Home";
import NavScrollExample from "./components/Navbar/Navbar";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import ProductList from "./components/Product/ProductList";

const App = () => {
  return (
    <>
      <NavScrollExample />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-success" element={<RegisterSuccess />} />

        <Route path="/add" element={<AddProduct />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/edit/:id" element={<EditProduct />} />

        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </>
  );
};

export default App;
