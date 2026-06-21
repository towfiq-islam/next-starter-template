"use client";
import { useGetUserData } from "@/hooks/api/auth_api";
import { createContext, useEffect, useState } from "react";
export const AuthContextProvider = createContext(null);

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { data: userData, isLoading: loadingUserData } = useGetUserData(token);

  useEffect(() => {
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(null);
      setLoading(false);
      return;
    }

    if (loadingUserData) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (userData?.status) {
      setUser(userData?.data);
    } else {
      setUser(null);
    }
  }, [token, userData, loadingUserData]);

  // values to pass:
  const contextValue = {
    loading,
    user,
    token,
    setToken,
  };

  return (
    <AuthContextProvider.Provider value={contextValue}>
      {children}
    </AuthContextProvider.Provider>
  );
}
