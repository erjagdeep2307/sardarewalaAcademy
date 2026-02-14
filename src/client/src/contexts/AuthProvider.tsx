import { refresh } from "@/apis/auth";
import { setAccessToken } from "./Token";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "react";
import { useState,useEffect } from "react";
import type { User } from "@/types/auth.types";
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
          setAccessToken(acToken); 
        }
      } catch (err) {
        console.error(err);
        setUser(null);
        setToken(null);
        setAccessToken(null);
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
export {AuthProvider};