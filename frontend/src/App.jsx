import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import JobCard from "./components/JobCard";
import Companies from "./pages/Companies";

import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas com o Header/Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacancies" element={<JobCard />} />
          <Route path="/companies" element={<Companies />} />
        </Route>

        {/* Rotas Sem o Header/Footer */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
