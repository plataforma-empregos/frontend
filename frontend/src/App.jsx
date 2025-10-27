import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import CompaniesPage from "./pages/CompaniesPage";
import VacanciesPage from "./pages/VacanciesPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import JobDetailsPage from "./pages/JobDetailsPage";

const routes = [
  { path: "/", breadcrumb: "Início", element: <HomePage /> },
  { path: "/companies", breadcrumb: "Empresas", element: <CompaniesPage /> },
  { path: "/vacancies", breadcrumb: "Vagas", element: <VacanciesPage /> },

  {
    path: "/vagas/:jobId",
    breadcrumb: "Detalhes da Vaga",
    element: <JobDetailsPage />,
  },
  { path: "/profile", breadcrumb: "Meu Perfil", element: <ProfilePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
];

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          {routes
            .filter(
              (route) =>
                ["/", "/companies", "/vacancies", "/profile"].includes(
                  route.path
                ) && !route.path.includes(":")
            )
            .map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          <Route path="/vagas/:jobId" element={<JobDetailsPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          {routes
            .filter((route) =>
              ["/login", "/register", "/forgot-password"].includes(route.path)
            )
            .map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export { routes };
export default App;
