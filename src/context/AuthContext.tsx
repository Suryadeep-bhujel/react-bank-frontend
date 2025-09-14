import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { User } from "../pages/admin/Users";
import { AuthService } from "../openapi-request";
import { OpenAPI } from "../openapi-request/core/OpenAPI"; // adjust path as needed

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
import { AuthUserState } from "./CurrentUserState";
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { getCurrentUser } = AuthUserState(); // no need to use `currentUser` anymore

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("_token");
      if (token) {
        const fetchedUser = await getCurrentUser(); // ← use returned user
        setUser(fetchedUser);
      }
      setLoading(false); // ✅ Done loading
    };
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
