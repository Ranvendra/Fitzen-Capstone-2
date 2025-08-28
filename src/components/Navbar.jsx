import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Dumbbell, Home, Users2, Phone, LogIn, LogOut, Menu, X } from "lucide-react";
import { auth } from "../firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Track current user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="./" style={{ cursor: "pointer", textDecoration: "none" }}>
        <div className="logo">
          <div>
            <img
              className="logo-circle"
              src="https://cdn-1.webcatalog.io/catalog/hubfit/hubfit-icon.png?v=1728054122750"
              alt="logo"
            />
          </div>
          Fitzen
        </div>
      </a>

      {/* Desktop Navigation */}
      <div className="navContainer">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Home size={18} /> Home
        </NavLink>
        <NavLink to="/exercise" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Dumbbell size={18} /> Exercise
        </NavLink>
        <NavLink to="/mentors" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Users2 size={18} /> Mentors
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          <Phone size={18} /> Contact
        </NavLink>
      </div>

      {/* Desktop Login/Logout */}
      {currentUser ? (
        <div className="logOut">
          <img
            src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            alt="profile"
            className="profile-circle"
          />
          <button onClick={handleLogout} className="logOut-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="login-btn">
          <LogIn size={18} /> Login
        </Link>
      )}

      {/* Mobile Hamburger Menu Button */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="mobile-link">
            <Home size={18} /> Home
          </NavLink>
          <NavLink to="/exercise" onClick={() => setMenuOpen(false)} className="mobile-link">
            <Dumbbell size={18} /> Exercise
          </NavLink>
          <NavLink to="/mentors" onClick={() => setMenuOpen(false)} className="mobile-link">
            <Users2 size={18} /> Mentors
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="mobile-link">
            <Phone size={18} /> Contact
          </NavLink>

          {currentUser ? (
            <button onClick={handleLogout} className="mobile-btn">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="mobile-btn">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
