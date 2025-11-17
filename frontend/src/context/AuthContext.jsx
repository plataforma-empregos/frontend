import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api";

const AuthContext = createContext(null);

function AuthLoader() {
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "5rem",
        textAlign: "center",
        fontSize: "1.1rem",
        color: "var(--clr-text-secondary)",
      }}
    >
      Carregando...
    </div>
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      setIsLoading(true);
      try {
        const response = await api.get("/auth/me");
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkUserSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Você saiu com sucesso!");
    }
  };

  const value = { user, isAuthenticated, isLoading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <AuthLoader /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
