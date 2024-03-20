import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./routes/dashboard.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login.tsx";
import { AuthProvider, RequireAuth } from "./customHooks/useAuth.tsx";
import Loading from "./components/Loading.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
    children: [
      {
        path: "/courses",
        element: <div>courses</div>,
        children: [
          {
            path: "add",
            element: <div>add</div>,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/loading",
    element: <Loading />
  }
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Loading />
    </AuthProvider>
  </React.StrictMode>
);
