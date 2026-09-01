import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (user.status === 'suspended') return <Navigate to="/" replace />;
  return children;
};

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;

  if (user.status === 'suspended') {
    return <Navigate to="/" replace />;
  }

  if (user.role === 'vendor' && user.status === 'pending') {
    return <Navigate to="/vendor/submitted" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const defaultPaths = { admin: '/admin', vendor: '/vendor', buyer: '/' };
    return <Navigate to={defaultPaths[user.role] || '/'} replace />;
  }

  return children;
};

