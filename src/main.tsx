import { createRoot } from 'react-dom/client'
import './index.css'
import  appRouter from './routes/appRoute.tsx'
import { RouterProvider } from 'react-router-dom'
// import { ThemeProvider } from './context/themeContext.tsx'
createRoot(document.getElementById('root')!).render(
  //<ThemeProvider>
  <RouterProvider router={appRouter}>
    {/* <App /> */}
  </RouterProvider>
  //</ThemeProvider>
)
