import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import ScrollToTop from "./components/ScrollToTop";

import { routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> <Toaster position="top-right" />
      <Routes>
        {/* Rotas que usam o MainLayout */}
        <Route element={<MainLayout />}>
          {routes
            .filter(
              (route) =>
                !["/login", "/register", "/forgot-password"].includes(
                  route.path
                )
            )
            .map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
        </Route>

        {/* Rotas que usam o AuthLayout */}
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

export default App;
