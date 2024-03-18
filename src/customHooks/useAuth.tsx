import React, { useState, useContext,ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthContextInterface {
  authed: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = React.createContext<AuthContextInterface | null>(null);

function useAuth(): AuthContextInterface {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login: () => new Promise((res) => {
      setAuthed(true);
      res();
    }),
    logout: () => new Promise((res) => {
      setAuthed(false);
      res();
    }),
  };
}

export function AuthProvider({ children }: { children: ReactNode })  {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer(): AuthContextInterface {
  const auth = useContext(authContext);
  if (auth === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
}
export   function RequireAuth({ children }: { children: ReactNode }) {
  const { authed } = AuthConsumer();
  return authed === true ? children : <Navigate to="/login" replace />;
}