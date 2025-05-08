import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Dumbbell,
  Home,
  Users2,
  Phone,
  LogIn
} from 'lucide-react';

import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <div><img className="logo-circle" src='https://cdn-1.webcatalog.io/catalog/hubfit/hubfit-icon.png?v=1728054122750'></img></div>
        Fitzen
      </div>

      {/* Navigation Links */}
      <div className="navContainer">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/exercise" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Dumbbell size={18} /> Exercise
        </NavLink>
        <NavLink to="/mentors" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Users2 size={18} /> Mentors
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <Phone size={18} /> Contact
        </NavLink>
      </div>

      {/* Login Button */}
      <Link to="/login" className="login-btn">
        <LogIn size={18} /> Login
      </Link>
    </nav>
  );
};

export default Navbar;