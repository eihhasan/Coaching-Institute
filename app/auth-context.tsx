'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getCurrentUser, initializeUsers, loginUser, logoutUser, registerUser } from '@/lib/auth';
import { initializeCourses } from '@/lib/courses';
import { initializeDummyData } from '@/lib/dummy-data';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      try {
        initializeUsers();
        initializeCourses();
        initializeDummyData();
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Login failed');
        throw new Error(result.error || 'Login failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setError(null);
  };

  const register = async (email: string, password: string, name: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const result = registerUser(email, password, name, 'student');
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        setError(result.error || 'Registration failed');
        throw new Error(result.error || 'Registration failed');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, register, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
