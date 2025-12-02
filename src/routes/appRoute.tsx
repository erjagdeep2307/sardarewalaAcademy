import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "../layouts/appLayout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Gallery } from "../pages/Gallery";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />, // must be closed
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/about",
        element: <About />,
      },
      {
        path: "/gallery",
        element:<Gallery/>  
      }
    ]
  }
]);

export default appRouter;
