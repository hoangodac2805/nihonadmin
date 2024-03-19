import React, { useState, useContext, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface AuthContextInterface {
  authed: boolean;
  isLoading: boolean;
  login: (user: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = React.createContext<AuthContextInterface | null>(null);

function useAuth(): AuthContextInterface {
  const [authed, setAuthed] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "http://localhost:8888/api/v1/authentication/loginByCookie",
          {
            credentials: "include",
            method: "post",
          }
        );
        const data = await response.json();
        setAuthed(data.status);
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return {
    authed,
    isLoading,
    login: (user) =>
      new Promise(async (res) => {
        await fetch("http://localhost:8888/api/v1/authentication/login", {
          credentials: "include",
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.status) {
              setAuthed(true);
            }
          })
        res();
      }),
    logout: () =>
      new Promise((res) => {
        setAuthed(false);
        res();
      }),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer(): AuthContextInterface {
  const auth = useContext(authContext);
  if (auth === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
}
export function RequireAuth({ children }: { children: ReactNode }) {
  const { authed, isLoading } = AuthConsumer();
  if (isLoading) {
    return <p>Loading...</p>; // Display loading message while checking
  }
  return authed === true ? children : <Navigate to="/login" replace />;
}
