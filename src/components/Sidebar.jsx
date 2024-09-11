import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/Auth/contexts/AuthContext';
import { Button } from 'react-bootstrap';
import menubar from '../assets/icons/menu-bar.png';
import logo from '../assets/images/flyer.png';
import './Components.css';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  console.log(currentUser);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  // Using useCallback to memoize the closeSidebar function
  const closeSidebar = useCallback((e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.sidebar-toggle');

    if (
      isSidebarOpen &&
      !sidebar.contains(e.target) && // Click is outside sidebar
      !toggleButton.contains(e.target) // Click is outside toggle button
    ) {
      setIsSidebarOpen(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', closeSidebar);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', closeSidebar);
    };
  }, [closeSidebar]);

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''} ${isMobile ? 'mobile' : ''}`}>
        <div className="sidebar-header">
          <img src={logo} alt="Traveloga Logo" className="sidebar-logo" />
          <h3 className="sidebar-title">TRAVELOGA</h3>
        </div>

        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">Home</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/resorts" className="sidebar-link">Resorts</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/restaurants" className="sidebar-link">Restaurants</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/places" className="sidebar-link">Site Seeing</Link>
          </li>
          <li className="sidebar-item">
            <Link to="/jeepsafari" className="sidebar-link">Jeep Safari</Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          {currentUser ? (
            <>
              <p>Welcome, {currentUser.displayName || currentUser.email}</p>
              <Button variant="outline-danger" onClick={handleLogout} className="w-100">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary w-100 mb-2">Login</Link>
              <Link to="/register" className="btn btn-outline-secondary w-100">Register</Link>
            </>
          )}
        </div>
      </div>

      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <img src={menubar} alt="Menu" />
      </button>
    </>
  );
};

export default Sidebar;
