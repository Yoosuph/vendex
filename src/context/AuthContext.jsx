import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('vendex_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email, password, role = 'buyer') => {
    // Determine user details based on input/role
    let loggedUser = null;

    if (email === 'admin@vendex.com' || role === 'admin') {
      loggedUser = {
        email: 'admin@vendex.com',
        name: 'Platform Administrator',
        role: 'admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
      };
    } else if (email === 'vendor@vendex.com' || role === 'vendor' || role === 'sell') {
      loggedUser = {
        email: 'vendor@vendex.com',
        name: 'Urban Goods Co.',
        role: 'vendor',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41RDevLs5ewhCctkHB4AJm3xzntKMjrI0lIRQlppFG8XsB1XsKrcki4JWqkk2Koc5Qa2tX92-IbjHsbwOa5L0L5X6_P5-8MjdQVa4bG7gyoXypWWilF5VtGdwAxmLv3wsdS52QLyzNQVQHFjRKrmWMGpeaRTpaLgit72PVkEKNVLtC4jy0ABv36fhtrdOcvqfnjD0_2kgnJjJ-4_AhZeFa2r5Q8VGqzr_MK2Y-nASOvvaDuSsIOT4Sgov7R2xGlZLX0XA4fj1ehO4'
      };
    } else {
      // Default to Alexander the Buyer
      loggedUser = {
        email: email || 'buyer@vendex.com',
        name: 'Alexander',
        role: 'buyer',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
      };
    }

    setUser(loggedUser);
    localStorage.setItem('vendex_user', JSON.stringify(loggedUser));
    return loggedUser;
  };

  const signup = (email, password, role) => {
    return login(email, password, role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vendex_user');
  };

  const switchRole = (role) => {
    let switchedUser = null;
    if (role === 'admin') {
      switchedUser = {
        email: 'admin@vendex.com',
        name: 'Platform Administrator',
        role: 'admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
      };
    } else if (role === 'vendor') {
      switchedUser = {
        email: 'vendor@vendex.com',
        name: 'Urban Goods Co.',
        role: 'vendor',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC41RDevLs5ewhCctkHB4AJm3xzntKMjrI0lIRQlppFG8XsB1XsKrcki4JWqkk2Koc5Qa2tX92-IbjHsbwOa5L0L5X6_P5-8MjdQVa4bG7gyoXypWWilF5VtGdwAxmLv3wsdS52QLyzNQVQHFjRKrmWMGpeaRTpaLgit72PVkEKNVLtC4jy0ABv36fhtrdOcvqfnjD0_2kgnJjJ-4_AhZeFa2r5Q8VGqzr_MK2Y-nASOvvaDuSsIOT4Sgov7R2xGlZLX0XA4fj1ehO4'
      };
    } else {
      switchedUser = {
        email: 'buyer@vendex.com',
        name: 'Alexander',
        role: 'buyer',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG'
      };
    }
    setUser(switchedUser);
    localStorage.setItem('vendex_user', JSON.stringify(switchedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
