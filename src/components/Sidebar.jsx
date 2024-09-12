import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/Auth/contexts/AuthContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars as solidBars } from '@fortawesome/free-solid-svg-icons';
import './Components.css';

const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const closeSidebar = useCallback((e) => {
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.querySelector('.sidebar-toggle');

    if (
      isSidebarOpen &&
      !sidebar.contains(e.target) && 
      !toggleButton.contains(e.target)
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
              <Link to="/login" className="sidebar-auth-link">Login</Link>
              <Link to="/register" className="sidebar-auth-link">Register</Link>
            </>
          )}
        </div>
      </div>

      <button className="sidebar-toggle" onClick={toggleSidebar}
        style={{
          transform: isSidebarOpen ? 'rotate(135deg)' : 'rotate(45deg)',
        }}
      >
        <FontAwesomeIcon 
          icon={solidBars}
          style={{
            height: "30px",
            color: "#000000"
          }}
        />
      </button>
    </>
  );
};

export default Sidebar;
