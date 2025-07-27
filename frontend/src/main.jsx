"use strict";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from '@pages/Root'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Error404 from '@pages/Error404'
import Users from '@pages/Users'
import Profile from '@pages/Profile'
import Asambleas from '@pages/Asambleas';
import AsambleasAdmin from '@pages/Asambleas';
import ProtectedRoute from '@components/ProtectedRoute';
import AntiProtectedRoute from '@components/AntiProtectedRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "presidente"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/asambleas-admin",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "presidente"]}>
            <AsambleasAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "/asambleas",
        element: (
          <AntiProtectedRoute bannedRoles={["administrador", "presidente"]}>
            <Asambleas />
          </AntiProtectedRoute>
        ),
      },        
      {
        path: "/profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
