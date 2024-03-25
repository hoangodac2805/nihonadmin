import React, { useState, useContext, ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authenticationService } from "../services/api/authenticationApi";
import useLoading from "./useLoading";
import toast from 'react-hot-toast';
import axios from "axios";

interface AuthContextInterface {
  authed: boolean;
  authedEmail?:string;
  login: (user: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = React.createContext<AuthContextInterface | null>(null);

function useAuth(): AuthContextInterface {
  const [authed, setAuthed] = useState(false);
  const [authedEmail, setAuthedEmail] = useState<string>('');

  const loadingStore = useLoading();
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        loadingStore.setLoadingOn();
        const response = await authenticationService.loginByCookie();
        if (response.status == 200) {
          setAuthedEmail(response.data.data?.email)
          setAuthed(true);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        loadingStore.setLoadingOff();
      }
    };

    checkLoginStatus();
  }, []);

  return {
    authed,
    authedEmail,
    login: (user) =>
    
      new Promise(async (res) => {
        try {
          loadingStore.setLoadingOn();
          const response = await authenticationService.login(user);
          if (response.status == 200) {
            toast.success(response.data.message);
            setAuthed(true);
          }
        } catch (error) {
          if(axios.isAxiosError(error)){
            toast.error(error.response?.data.message);
          }else{
            toast.error("Login failure!!! Please try again");
          }
        } finally {
          loadingStore.setLoadingOff();
        }
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
  const { authed } = AuthConsumer();
  return authed === true ? children : <Navigate to="/login" replace />;
}
