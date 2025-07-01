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
    const res = await axios.post('https://campusconnect-ki0p.onrender.com/api/user/login/', {
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

  // ✅ Add token refresh + retry logic
  useEffect(() => {
    const axiosRequestInterceptor = axios.interceptors.request.use(
      async (config) => {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const axiosResponseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If access token is expired and it's the first retry attempt
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const res = await axios.post('https://campusconnect-ki0p.onrender.com/api/user/token/refresh/', {
              refresh: refreshToken,
            });

            const newAccessToken = res.data.access;
            localStorage.setItem('access_token', newAccessToken);

            // Retry original request with new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            logout(); // Refresh token failed – logout user
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(axiosRequestInterceptor);
      axios.interceptors.response.eject(axiosResponseInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
