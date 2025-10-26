import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import CompaniesPage from "./pages/Companies";
import VacanciesPage from "./components/JobCard";
import LoginPage from "./pages/Login";
import ForgotPasswordPage from "./pages/ForgotPassword";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ScrollToTop from "./components/ScrollToTop";
import Terms from "./pages/Terms";
import Advice from "./pages/Advice";
import HelpDocs from "./pages/HelpDocs";
import Guide from "./pages/Guide";
import Updates from "./pages/Updates";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          <Route path="/terms" element={<Terms />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/help-docs" element={<HelpDocs />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/contact" element={<Contact />} />

          {/* Rota protegida */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
