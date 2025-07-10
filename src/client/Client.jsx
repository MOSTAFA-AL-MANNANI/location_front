import React from "react";
import Contact from './contact';
import AllCars from './AllCars';
import CarDetails from './carsDetailes';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from "./register";


export default function Client(){
    return (
        <Router>
        <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Contact/>} />
          <Route path="/allcars" element={<AllCars/>} />
          <Route path="/car/:id" element={<CarDetails/>} />
          <Route path="/login" element={<AuthForm type="login" />} />
        <Route path="/register" element={<AuthForm type="register" />} />
        </Routes>
      </div>
  </Router>
    )
}