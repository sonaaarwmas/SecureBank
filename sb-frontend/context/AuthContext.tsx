"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  username: string | null;
  setUsername: (value: string | null) => void;
  cash: number;
  setCash: (value: number) => void;
  logout: () => void;
  refreshAuthState: () => void;
  loading: boolean; 
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  username: null,
  setUsername: () => {},
  cash: 0,
  setCash: () => {},
  logout: () => {},
  refreshAuthState: () => { },
  loading: true, 
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookiePart = parts.pop();
    if (cookiePart !== undefined) {
      return cookiePart.split(";").shift();
    }
  }
  return undefined;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [cash, setCash] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCash = async (username: string) => {
    try {
      const response = await fetch(`http://localhost:1337/api/User/GetAvailableFunds?user=${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCash(data.balance);
    } catch (error) {
      console.error("Failed to fetch cash amount", error);
    }
  };

  const logout = () => {
    console.log("Logging out");
    setIsAuthenticated(false);
    setUsername(null);
    setCash(0);
    localStorage.removeItem("authCookie");
    localStorage.removeItem("username");
    document.cookie = "authCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    refreshAuthState();
  };

  const refreshAuthState = async () => {
    const authCookie = getCookie("authCookie") || localStorage.getItem("authCookie");
    const storedUsername = localStorage.getItem("username");
    if (authCookie && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      fetchCash(storedUsername);
      console.log("User Authenticated, cookie or local storage present", authCookie);
    } else {
      setIsAuthenticated(false);
      setUsername(null);
      setCash(0);
      console.log("User not authenticated");
    }
    setLoading(false);
  };
  

  useEffect(() => {
    console.log("Initializing AuthContext");
    refreshAuthState();
  }, []);

  useEffect(() => {
    if (username) {
      console.log("Fetching cash for username:", username);
      fetchCash(username);
    }
  }, [username]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated: (value) => {
          console.log("Setting isAuthenticated to", value);
          setIsAuthenticated(value);
        },
        username,
        setUsername: (value) => {
          console.log("Setting username to", value);
          setUsername(value);
        },
        cash,
        setCash: (value) => {
          console.log("Setting cash to", value);
          setCash(value);
        },
        logout,
        refreshAuthState,
        loading, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};