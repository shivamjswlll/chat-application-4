import React from "react";
import "./App.css";
import Login from "./login/Login";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Register from "./register/Register";
import Home from "./home/Home";
import { VerifyUser } from "./utils/VerifyUser";

function App() {
  return (
    <div className="p-2 w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<VerifyUser />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
