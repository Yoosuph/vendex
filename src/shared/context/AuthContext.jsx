import React, { createContext, useState, useEffect, useCallback } from 'react';
import { mockDb, hashPassword } from "@/shared/db/mockDb";

export const AuthContext = createContext();

const SESSION_SECRET = 'vendex_session_hmac_key_2026';

async function signSession(user) {
  const payload = JSON.stringify(user);
  return await hashPassword(payload + SESSION_SECRET);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('vendex_user');
    const savedSig = localStorage.getItem('vendex_user_sig');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      signSession(parsed).then(expectedSig => {
        if (savedSig && savedSig === expectedSig) {
          setUser(parsed);
        } else {
          localStorage.removeItem('vendex_user');
          localStorage.removeItem('vendex_user_sig');
        }
        setInitialized(true);
      });
    } else {
      setInitialized(true);
    }
  }, []);

  const persistUser = useCallback(async (userToSet) => {
    setUser(userToSet);
    if (userToSet) {
      localStorage.setItem('vendex_user', JSON.stringify(userToSet));
      const sig = await signSession(userToSet);
      localStorage.setItem('vendex_user_sig', sig);
    } else {
      localStorage.removeItem('vendex_user');
      localStorage.removeItem('vendex_user_sig');
    }
  }, []);

  const login = async (email, password) => {
    const users = mockDb.get('users');
    const inputHash = await hashPassword(password);
    const matched = users.find(u => u.email === email && u.password === inputHash);
    if (!matched) throw new Error("Invalid credentials");
    await persistUser(matched);
    return matched;
  };

  const signup = async (name, email, password, role = 'buyer', extraData = {}) => {
    const users = mockDb.get('users');
    if (users.find(u => u.email === email)) throw new Error("Email already registered");
    const hashedPw = await hashPassword(password);
    const newUser = {
      id: 'u_' + Date.now(), name, email, password: hashedPw, role,
      vendorId: undefined,
      status: role === 'vendor' ? 'pending' : undefined,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG',
      ...extraData,
    };
    mockDb.set('users', [...users, newUser]);
    await persistUser(newUser);
    return newUser;
  };

  const logout = () => { setUser(null); localStorage.removeItem('vendex_user'); localStorage.removeItem('vendex_user_sig'); };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {initialized ? children : null}
    </AuthContext.Provider>
  );
};
