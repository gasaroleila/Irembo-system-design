import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import "./styles/globals.css";
import "./styles/tailwind.css"; // tailwindcss styles
import { Route, useLocation } from "react-router-dom";
import { Routes } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import ResetPassword from './pages/resetPassword';
import Dashboard from './pages/dashboard';


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/resetPassword" element={<ResetPassword />} />
      <Route path="/" element={<Dashboard/>}/>
      
    </Routes>
  ) 
}

export default App
