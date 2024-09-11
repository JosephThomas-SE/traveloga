// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../pages/Auth/contexts/AuthContext';

// Helper function to protect routes (for example, allowing only logged-in users to access specific routes)
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();
  
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
  
    if (!currentUser.emailVerified) {
      alert("Please verify your email to access this page.");
      return <Navigate to="/login" />;
    }
  
    return (
      <Routes>
        <Route {...rest} element={<Component />} />
      </Routes>
    );
  };

  export default PrivateRoute;
