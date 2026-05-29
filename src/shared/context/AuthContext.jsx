import React, { createContext, useState } from 'react';
import { mockDb } from "@/shared/db/mockDb";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vendex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password, role = null) => {
    const users = mockDb.get('users');
    const matched = users.find(u => u.email === email && u.password === password);
    if (!matched) throw new Error("Invalid credentials");
    const userToSet = role ? { ...matched, role } : matched;
    setUser(userToSet);
    localStorage.setItem('vendex_user', JSON.stringify(userToSet));
    return userToSet;
  };

  const signup = (name, email, password, role = 'buyer') => {
    const users = mockDb.get('users');
    if (users.find(u => u.email === email)) throw new Error("Email already registered");
    const newUser = {
      id: 'u_' + Date.now(), name, email, password, role,
      vendorId: role === 'vendor' ? 'v_' + Date.now() : undefined,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
    };
    mockDb.set('users', [...users, newUser]);
    setUser(newUser);
    localStorage.setItem('vendex_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => { setUser(null); localStorage.removeItem('vendex_user'); };

  const switchRole = (role) => {
    if (!user) return;
    const updated = { ...user, role };
    setUser(updated);
    localStorage.setItem('vendex_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
