import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // Se não estiver logado → manda para login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado → renderiza a página normalmente
  return children;
}
