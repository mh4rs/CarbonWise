import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Calculator from './pages/calculator/Calculator';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Admin from './pages/admin/Admin';

function NavigationWrapper() {
  const location = useLocation();

  const showNavbar = location.pathname === '/calculator' || location.pathname === '/dashboard' || location.pathname === '/admin';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavigationWrapper />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
