import React, { createContext, useState, useCallback } from 'react';
import * as authApi from '@/shared/api/auth';
import { getToken } from '@/shared/api/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const u = await authApi.login(email, password);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password, role = 'buyer') => {
    setLoading(true);
    try {
      const u = await authApi.register(name, email, password, role);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
