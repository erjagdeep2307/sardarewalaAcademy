import  { createContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
import type { User } from "@/types/auth.types";
// 2. Define the Context interface
interface AuthContextType {
    user: User | null; 
    setUser: Dispatch<SetStateAction<User | null>>; // This expects a User or null
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
}
const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: { children: ReactNode }) => {
    // FIX: You MUST add <User | null> here. 
    // Without this, TS thinks setUser can only ever accept 'null'.
    const [user, setUser] = useState<User | null>(null);
    
    // FIX: You MUST add <string | null> here.
    const [token, setToken] = useState<string | null>(null);

    return (
        <AuthContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
    // const context = useContext(AuthContext);
export { AuthContext,AuthProvider};