import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useEffect,
} from "react";
import type { User } from "@/types/auth.types";
import { refresh } from "@/apis/auth";
// 2. Define the Context interface
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // This expects a User or null
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  loading:boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  // FIX: You MUST add <User | null> here.
  // Without this, TS thinks setUser can only ever accept 'null'.
  const [user, setUser] = useState<User | null>(null);
  // FIX: You MUST add <string | null> here.
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authRefresh = async () => {
      try {
        const apiResponse = await refresh();
        console.log(apiResponse);
        if (apiResponse.status === "success" && apiResponse.data) {
          const uData = apiResponse.data?.userData;
          const acToken = apiResponse.data?.token;
          setUser(uData);
          setToken(acToken);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setToken(null);
      }
      finally{
        setLoading(false);
      }
    };
    authRefresh();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,loading }}>
      {children}
    </AuthContext.Provider>
  );
};
// const context = useContext(AuthContext);
export { AuthContext, AuthProvider };
