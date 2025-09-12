import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <main>
      <Outlet />{" "}
      {/* Inserir as páginas sem Header/Footer, Login, Sign in and Forgot Password */}
    </main>
  );
}

export default AuthLayout;
