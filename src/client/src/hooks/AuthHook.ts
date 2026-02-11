import { useContext } from "react";
import {AuthContext} from "@/contexts/AuthContext";
import {useMutation,useQueryClient} from "@tanstack/react-query";
import {logout} from "@/apis/auth";
const useAuth = () => { 
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
const useLogout = () =>{
    const {setUser,token,setToken} = useAuth();
    const queryClient = useQueryClient();
    const {mutate:logoutMutation,isPending} = useMutation({
        mutationFn: async() => {
            return await logout(token);
        },
        onSuccess: () => {
            // Invalidate any queries that might have user-specific data
            queryClient.clear();
        },   
        onError: (err) => {
            console.error("Logout failed:", err);
            setToken(null);
            setUser(null);
        }   
    });
    return {logoutMutation,isPending};
}
export {useAuth,useLogout};