import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session in localStorage
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call to verify credentials
    // For demo purposes, we're simulating the login
    
    // Simulated delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Hard-coded user credentials for demo
    const users = [
      { id: '1', name: 'Dr. Jane Smith', username: 'doctor', password: 'password', role: 'Doctor' as Role },
      { id: '2', name: 'John Doe', username: 'patient', password: 'password', role: 'Patient' as Role },
      { id: '3', name: 'Admin User', username: 'admin', password: 'password', role: 'Admin' as Role }
    ];
    
    const foundUser = users.find(u => u.username === username && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    
    // Create user object (exclude password)
    const authenticatedUser: User = {
      id: foundUser.id,
      name: foundUser.name,
      username: foundUser.username,
      role: foundUser.role
    };
    
    // Store in state and localStorage
    setUser(authenticatedUser);
    localStorage.setItem('user', JSON.stringify(authenticatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};