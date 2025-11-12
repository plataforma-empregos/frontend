import HomePage from "../pages/HomePage";
import CompaniesPage from "../pages/CompaniesPage";
import VacanciesPage from "../pages/VacanciesPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import TermsOfUse from "../pages/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Terms from "../pages/Terms";
import Advice from "../pages/Advice";
import HelpDocs from "../pages/HelpDocs";
import Guide from "../pages/Guide";
import Updates from "../pages/Updates";
import Contact from "../pages/Contact";

export const routes = [
  // Rotas do MainLayout
  { path: "/", breadcrumb: "Início", element: <HomePage /> },
  { path: "/companies", breadcrumb: "Empresas", element: <CompaniesPage /> },
  { path: "/vacancies", breadcrumb: "Vagas", element: <VacanciesPage /> },
  {
    path: "/vagas/:jobId",
    breadcrumb: "Detalhes da Vaga",
    element: <JobDetailsPage />,
  },
  { path: "/termsofuse", breadcrumb: "Termos de Uso", element: <TermsOfUse /> },
  {
    path: "/privacy-policy",
    breadcrumb: "Política de Privacidade",
    element: <PrivacyPolicy />,
  },
  { path: "/terms", breadcrumb: "Termos", element: <Terms /> },
  { path: "/advice", breadcrumb: "Conselhos", element: <Advice /> },
  {
    path: "/help-docs",
    breadcrumb: "Documentos de Ajuda",
    element: <HelpDocs />,
  },
  { path: "/guide", breadcrumb: "Guia", element: <Guide /> },
  { path: "/updates", breadcrumb: "Atualizações", element: <Updates /> },
  { path: "/contact", breadcrumb: "Contato", element: <Contact /> },
  {
    path: "/profile",
    breadcrumb: "Meu Perfil",
    element: <ProfilePage />,
  },

  // Rotas do AuthLayout
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
];
