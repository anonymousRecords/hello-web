import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/Layout";
import Error from "../Error/Error";
import CssPage from "../CssPage/CssPage";
import JavascriptPage from "../JavascriptPage/JavascriptPage";
import ReactPage from "../ReactPage/ReactPage";
import CssArchive from "../CssPage/CssArchive/CssArchive";
import ReactArchive from "../ReactPage/ReactArchive/ReactArchive";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/css",
        element: <CssPage />,
      },
      {
        path: "/css/:id",
        element: <CssArchive />,
      },
      {
        path: "/javascript",
        element: <JavascriptPage />,
      },
      {
        path: "/react",
        element: <ReactPage />,
      },
      {
        path: "/react/:id",
        element: <ReactArchive />,
      },
    ],
  },
]);