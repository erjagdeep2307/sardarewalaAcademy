import { createBrowserRouter } from "react-router-dom";
import { PublicLayout } from "@/layouts/appLayout";
import { Home } from "@/pages/public/Home";
import { About } from "@/pages/public/About";
import { Gallery } from "@/pages/public/Gallery";
import { Contact } from "@/pages/public/Contact";
import {Event} from "@/pages/public/Event"
import { AdminLayout } from "@/layouts/adminLayout";
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminGalleryView } from "@/pages/admin/Gallery/List";
import {Create} from "@/pages/admin/Gallery/Create";
import { AdminGalleryLayout } from "@/layouts/galleryLayout";
import { AdminTestimonials } from "@/pages/admin/Testmonies";
const appRouter = createBrowserRouter([
// Public Routes
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
      },
      {
        path: "/contact",
        element:<Contact/>  
      },
      {
        path: "/event/:eventId",
        element:<Event />  
      },

    ]
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
        element: <AdminGalleryLayout />,
        children: [
          {
              index: true,
              element: <AdminGalleryView />, 
          },
          {
              path: "create",
              element: <Create />, 
          }
        ],
      },
      {
        path:'testomonials',
        element:<AdminTestimonials/>
      }
    ],  
  }
]);

export default appRouter;
