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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleMobileLogout = () => {
    logout();
    toggleMenu();
    navigate("/");
  };

  const handleProtectedNav = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      setShowLoginPrompt(true);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            <li>
              <button
                onClick={() => handleProtectedNav("/vacancies")}
                className={styles.navButton}
              >
                Buscar Vagas
              </button>
            </li>

            <li>
              <button
                onClick={() => handleProtectedNav("/companies")}
                className={styles.navButton}
              >
                Buscar Empresas
              </button>
            </li>

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

            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          <button className={styles.hamburgerButton} onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul className={styles.navLinksMobile}>
              <li>
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

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onRequestClose={() => setShowLoginPrompt(false)}
      />
    </header>
  );
}
