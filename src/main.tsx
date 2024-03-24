import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./routes/dashboard.tsx";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login.tsx";
import { AuthProvider, RequireAuth } from "./customHooks/useAuth.tsx";
import Loading from "./components/C_Loading.tsx";
import { Toaster } from "react-hot-toast";
import R_AddCourses from "./routes/Courses/R_AddCourses.tsx";
import R_Courses from "./routes/Courses/R_Courses.tsx";
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
        element: <R_Courses />,
      },
      {
        path: "/courses/add",
        element:<R_AddCourses/>
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Loading />
      <Toaster />
    </AuthProvider>
  </React.StrictMode>
);
