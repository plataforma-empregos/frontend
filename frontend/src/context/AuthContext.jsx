import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 'isLoading' está como true enquando é feita a verificação inicial do cookie - eduardo
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUserSession() {
      setIsLoading(true);
      try {
        // Chamei um endpoint protegido no backend (ex: /auth/me)
        //   O 'api.js' está enviando o 'withCredentials: true' automaticamente.
        const response = await api.get("/auth/me");
        setUser(response.data.user); // Ajustar conforme o back (ex: response.data) - eduardo
        setIsAuthenticated(true);
      } catch (error) {
        // Se der algum tipo de erro (ex: 401), o cookie é inválido ou não existe. Então, manter o usuário deslogado!
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }

    checkUserSession();
  }, []);

  //Função de Login

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  //Função de Logout
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

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
