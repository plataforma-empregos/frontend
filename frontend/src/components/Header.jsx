import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import styles from "../styles/Header.module.css";
import ThemeToggleButton from "./ThemeToggleButton";
import LoginPromptModal from "./LoginPromptModal";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  // Controla a abertura e fechamento do menu mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logout no desktop
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Logout no mobile
  const handleMobileLogout = () => {
    logout();
    toggleMenu();
    navigate("/");
  };

  // Função para controlar acesso a rotas protegidas (como /vacancies)
  const handleProtectedNav = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowLoginPrompt(true); // exibe o modal de login
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo da plataforma */}
        <div className={styles.logo}>
          <Logo />
        </div>

        {/* Menu de navegação - versão desktop */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            <li>
              {/* Botão de "Buscar Vagas" protegido */}
              <button
                onClick={() => handleProtectedNav("/vacancies")}
                className={styles.navButton}
              >
                Buscar Vagas
              </button>
            </li>

            <li>
              <Link to="/companies">Buscar Empresas</Link>
            </li>

            {/* Opções exibidas de acordo com o estado de autenticação */}
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile">Perfil</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutButton}
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className={styles.signupButton}>
                    Cadastrar-se
                  </Link>
                </li>
              </>
            )}

            {/* Botão de alternância de tema */}
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>

        {/* Botão hamburguer (mobile) */}
        <div className="flex items-center gap-4 md:hidden">
          <button className={styles.hamburgerButton} onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {/* Menu lateral (mobile) */}
        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul className={styles.navLinksMobile}>
              <li>
                {/* "Buscar Vagas" no menu mobile também protegido */}
                <button
                  onClick={() => {
                    handleProtectedNav("/vacancies");
                    toggleMenu();
                  }}
                  className={styles.navButtonMobile}
                >
                  Buscar Vagas
                </button>
              </li>

              <li>
                <Link to="/companies" onClick={toggleMenu}>
                  Buscar Empresas
                </Link>
              </li>

              {/* Opções mobile de autenticação */}
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile" onClick={toggleMenu}>
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleMobileLogout}
                      className={styles.logoutButtonMobile}
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={toggleMenu}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className={styles.signupButtonMobile}
                      onClick={toggleMenu}
                    >
                      Cadastrar-se
                    </Link>
                  </li>
                </>
              )}

              {/* Alternância de tema no menu mobile */}
              <li className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span>Alternar Tema:</span>
                  <ThemeToggleButton />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Modal exibido quando usuário tenta acessar área protegida */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onRequestClose={() => setShowLoginPrompt(false)} // ✅ Corrigido para o mesmo padrão da SearchBar
      />
    </header>
  );
}
