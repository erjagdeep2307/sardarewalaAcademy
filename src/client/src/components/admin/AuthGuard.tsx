import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/AuthHook";
export const AuthGuard : React.FC = () => {
    const {token,loading} = useAuth();
    if(loading)
    {
        return <div>Loadding</div>
    }
    if(!token)
    {
        return <Navigate to={"/login"} replace/>
    }
    return (
    <Outlet />  
    )
}