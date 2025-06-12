import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../UserContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user } = useUser();

  // If no user is logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // If admin access is required but user is not admin, redirect to home
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute; 