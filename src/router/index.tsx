import { createBrowserRouter } from "react-router-dom";

import Home from "../Home/Home";
import Layout from "../Layout/Layout";
import Archive0 from "../Archive/0/Archive0";
import Error from "../Error/Error";


export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/archive/0",
        element: <Archive0 />,
      }
    ],
  },
]);
