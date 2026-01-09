import { createRoot } from 'react-dom/client'
import './index.css'
import appRouter from '@/routes/appRoute.tsx'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={appRouter}>
    </RouterProvider>
    <ToastContainer position='top-right' autoClose={1000} closeOnClick={true} />
  </QueryClientProvider>
)
