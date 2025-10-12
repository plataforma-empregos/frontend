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

  // carregar usuário do localStorage apenas se a sessão estiver ativa
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const sessionActive = sessionStorage.getItem("sessionActive");

    if (savedUser && sessionActive) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, []);

  // login (simula autenticação e cria sessão)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // mantém os dados salvos
    sessionStorage.setItem("sessionActive", "true"); // marca a sessão como ativa
  };

  // logout (encerra sessão mas mantém dados do cadastro)
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("sessionActive"); // encerra a sessão
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
