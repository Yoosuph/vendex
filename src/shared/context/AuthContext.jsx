import React, { createContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '@/shared/api/auth';
import { getToken } from '@/shared/api/client';

export const AuthContext = createContext();

function normalizeRole(user) {
  if (!user) return user;
  return { ...user, role: user.role?.toLowerCase() };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => null);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Try to restore session on mount if token exists
  useEffect(() => {
    const restore = async () => {
      if (!getToken()) {
        setInitialized(true);
        return;
      }
      try {
        const { getProfile } = await import('@/shared/api/users');
        const profile = await getProfile();
        if (profile) setUser(normalizeRole(profile));
      } catch {
        authApi.logout();
      } finally {
        setInitialized(true);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const u = await authApi.login(email, password);
      const normalized = normalizeRole(u);
      setUser(normalized);
      return normalized;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (name, email, password, role = 'buyer') => {
    setLoading(true);
    try {
      const u = await authApi.register(name, email, password, role);
      const normalized = normalizeRole(u);
      setUser(normalized);
      return normalized;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
  }, []);

  const updateUser = useCallback((partial) => {
    setUser((prev) => (prev ? normalizeRole({ ...prev, ...partial }) : prev));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading, updateUser, initialized }}>
      {initialized ? children : null}
    </AuthContext.Provider>
  );
};
