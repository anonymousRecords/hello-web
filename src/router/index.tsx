import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/Layout";
import Error from "../Error/Error";
import Main from "../Main/Main";
import ProjectPage from "../Projects/ProjectPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/projects/:id",
        element: <ProjectPage />,
      },
    ],
  },
]);
