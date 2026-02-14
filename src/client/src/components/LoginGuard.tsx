import { useAuth } from "@/hooks/AuthHook";
import { Navigate, Outlet } from "react-router-dom";
export const PublicRoute:React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loadinig </div>;

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};