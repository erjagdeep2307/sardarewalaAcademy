import { createRoot } from 'react-dom/client'
import './index.css'
import appRouter from '@/routes/appRoute.tsx'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={appRouter}>
    </RouterProvider>
  </QueryClientProvider>
)
