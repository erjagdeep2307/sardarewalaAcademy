import { createRoot } from 'react-dom/client'
import './index.css'
import appRouter from '@/routes/appRoute.tsx'
import { AuthProvider } from '@/contexts/AuthProvider';
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { StrictMode } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={appRouter}>
        </RouterProvider>
      </AuthProvider>
      <ToastContainer position='top-right' autoClose={1000} closeOnClick={true} />
      <SpeedInsights />
    </QueryClientProvider>
  </StrictMode>
)
