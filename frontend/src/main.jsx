/*"use strict";
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
import Inquietudes from '@pages/Inquietudes'
import Asambleas from '@pages/Asambleas';
import Solicitudes from "@pages/Solicitudes";

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
        path: "/solicitudes", // <-- NUEVA RUTA PARA SOLICITUDES
        element: (
          <ProtectedRoute allowedRoles={["presidente"]}>
            <Solicitudes />
          </ProtectedRoute>
        ),
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
        element: <Meeting />,
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
*/

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
//import Books from '@pages/Books'; // Si aún usas Books
import Solicitudes from '@pages/Solicitudes'; // IMPORTANTE: importa la nueva página
import ProtectedRoute from '@components/ProtectedRoute'

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
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/solicitudes", // <-- NUEVA RUTA PARA SOLICITUDES
        element: (
          <ProtectedRoute allowedRoles={["ESTUDIANTE", "CEE", "administrador"]}>
            <Solicitudes />
          </ProtectedRoute>
        ),
      },
      // Si quieres, puedes dejar Books solo para pruebas o retirarlo si ya no lo usas
      // {
      //   path: "/books",
      //   element: <Books />,
      // },
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

