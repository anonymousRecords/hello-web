import { createBrowserRouter } from "react-router-dom";

import Home from "../Home/Home";
import Layout from "../Layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
