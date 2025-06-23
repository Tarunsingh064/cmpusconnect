'use client';
import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (accessToken && storedUser) {
      setUser(JSON.parse(storedUser)); // Set from localStorage
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('http://127.0.0.1:8000/api/user/login/', {
      username,
      password,
    });

    // Save tokens
    localStorage.setItem('access_token', res.data.access);
    localStorage.setItem('refresh_token', res.data.refresh);

    // Save and set user from response
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);

    return true;
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
