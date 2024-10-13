// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/student-login" />;
  }

  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;