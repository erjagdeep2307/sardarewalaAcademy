import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { User } from "@/types/auth.types";
// 2. Define the Context interface
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>; // This expects a User or null
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  loading:boolean;
}
const AuthContext = createContext<AuthContextType | null>(null);

// const context = useContext(AuthContext);
export { AuthContext};
