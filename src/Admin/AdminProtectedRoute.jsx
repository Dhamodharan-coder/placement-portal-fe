// src/Components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token3'); // Check if token exists

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/admin-login" />;
  }

  // If token exists, render the protected component
  return children;
};


export default AdminProtectedRoute
