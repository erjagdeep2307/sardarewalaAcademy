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

const appRouter = createBrowserRouter([
  // Public Routes
  {
    path: "/login",
    element: <Login />,
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
    ],
  },
]);

export default appRouter;
