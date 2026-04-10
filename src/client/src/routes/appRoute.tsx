import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/layouts/appLayout";

import { Home } from "@/pages/public/Home";
import { Event } from "@/pages/public/Event";
import { About } from "@/pages/public/About";
import { Gallery } from "@/pages/public/Gallery";
import { Contact } from "@/pages/public/Contact";
import { AdminLayout } from "@/layouts/adminLayout";
import { AdminGallery } from "@/pages/admin/Gallery";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminTestimonials } from "@/pages/admin/Testmonies";
import { Login } from "@/pages/public/Login";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { PublicRoute } from "@/components/LoginGuard";
import AdminProgram from "@/pages/admin/Program";
const appRouter = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: <PublicRoute />,
    children:[
      {
        index:true,
        element:<Login/>
      }
    ]
  },
  {
    path: "/",
    element: <PublicLayout />, // must be closed
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/event/:eventId",
        element: <Event />,
      },
    ],
  },
  // Admin Routes
  {
    path: "/admin/",
    element: <AuthGuard />,
    children: [
      {
        element: <AdminLayout />, // must be closed
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "gallery",
            element: <AdminGallery />,
          },
          {
            path: "testomonials",
            element: <AdminTestimonials />,
          },
          {
            path: "programs",
            element: <AdminProgram />,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
