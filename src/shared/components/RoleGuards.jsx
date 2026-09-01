import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/shared/context/AuthContext';
import LoadingSpinner from '@/shared/components/LoadingSpinner';

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="md" text="Authenticating..." />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.status === 'suspended') return <Navigate to="/" replace />;
  return children;
};

export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="md" text="Authenticating..." />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

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

