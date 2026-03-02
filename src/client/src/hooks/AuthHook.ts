import { useContext } from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {logout} from "@/apis/auth";
const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
const useLogout = () =>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {setUser,setToken} = useAuth();
    const {mutate:logoutMutation,isPending} = useMutation({
        mutationFn: async() => {
            return await logout();
        },
        onSuccess: () => {
            // Invalidate any queries that might have user-specific data
            setToken(null);
            setUser(null);
            queryClient.clear();
            navigate('/',{replace:true})
        },   
        onError: (err) => {
            console.error("Logout failed:", err);
            setToken(null);
            setUser(null);
            navigate('/',{replace:true})
        }   
    });
    return {logoutMutation,isPending};
}
export {useAuth,useLogout};