"use strict";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from '@pages/Root'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Meeting from '@pages/Meeting'
import Register from '@pages/Register'
import Error404 from '@pages/Error404'
import Users from '@pages/Users'
import Profile from '@pages/Profile'
import ProtectedRoute from '@components/ProtectedRoute'
import Operaciones from '@pages/Operaciones';
import Inquietudes from '@pages/Inquietudes'
import Asambleas from '@pages/Asambleas';
import Solicitudes from '@pages/Solicitudes';
import { getAllowedRoles } from "../algo/globalIsAdmin.js";

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
          <ProtectedRoute allowedRoles={getAllowedRoles()}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
       path:"/Operaciones",
       element :<Operaciones/>
      },
      {
        path: "/asambleas",
        element: <Asambleas />,
      },      
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inquietudes",
        element: <Inquietudes />,
      },
      {

        path: "/meeting",
        element: (
          <ProtectedRoute allowedRoles={getAllowedRoles()}>
            <Meeting />
          </ProtectedRoute>
        ),
      },
      {
        path: "/solicitudes",
        element: <Solicitudes />,
      },
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