import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import Dashboard from "./pages/Dashboard";
import Printer from "./pages/Printer";
import Printers from "./pages/Printers";
import Location from "./pages/Location";
import Locations from "./pages/Locations";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/printers",
        element: <Printers />,
      },
      {
        path: "/printer/:id",
        element: <Printer />,
      },
      {
        path: "/locations",
        element: <Locations />,
      },
      {
        path: "/location/:id",
        element: <Location />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
