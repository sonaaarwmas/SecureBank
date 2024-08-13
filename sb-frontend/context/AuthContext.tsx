"use client";

import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  username: string | null;
  setUsername: (value: string | null) => void;
  cash: number;
  setCash: (value: number) => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  username: null,
  setUsername: () => {},
  cash: 0,
  setCash: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [cash, setCash] = useState(0);

  const handleSetIsAuthenticated = (value: boolean) => {
    console.log("Setting isAuthenticated to:", value);
    setIsAuthenticated(value);
  };

  const handleSetUsername = (value: string | null) => {
    console.log("Setting username to:", value);
    setUsername(value);
  };

  const handleSetCash = (value: number) => {
    console.log("Setting cash to:", value);
    setCash(value);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated, username, setUsername: handleSetUsername, cash, setCash: handleSetCash }}>
      {children}
    </AuthContext.Provider>
  );
};