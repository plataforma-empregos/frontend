import { createContext, useContext, useState, useEffect } from "react";

// cria o contexto
const AuthContext = createContext();

// hook para usar o contexto
export function useAuth() {
  return useContext(AuthContext);
}

// provider do AuthContext
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // carregar usuário do localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // login fake (pode trocar depois por API)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout
  const logout = () => {
    setUser(null);
    // localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
