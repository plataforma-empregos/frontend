import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import styles from "../styles/Header.module.css";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMobileLogout = () => {
    logout();
    toggleMenu();
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
              <Link to="/vacancies">Buscar Vagas</Link>
            </li>
            <li>
              <Link to="/companies">Buscar Empresas</Link>
            </li>

            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/profile">Perfil</Link>
                </li>
                <li>
                  <button onClick={logout} className={styles.logoutButton}>
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

            {/* Botão de Tema (Sempre Visível no Desktop) */}
            <li>
              <ThemeToggleButton />
            </li>
          </ul>
        </nav>

        {/* Botão Hamburger (Apenas Mobile) */}
        {/* REMOVIDO o ThemeToggleButton daqui */}
        <button
          className={`${styles.hamburgerButton} md:hidden`}
          onClick={toggleMenu}
        >
          {" "}
          {/* Garante que só aparece em mobile */}☰
        </button>

        {/* ====== MOBILE NAVIGATION (Dropdown) ====== */}
        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul className={styles.navLinksMobile}>
              {/* Links sempre visíveis */}
              <li>
                <Link to="/vacancies" onClick={toggleMenu}>
                  Buscar Vagas
                </Link>
              </li>
              <li>
                <Link to="/companies" onClick={toggleMenu}>
                  Buscar Empresas
                </Link>
              </li>

              {/* Links/Botões de Autenticação Condicionais */}
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

              {/* Botão de Tema (Sempre Visível DENTRO do Menu Mobile) */}
              <li className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {" "}
                {/* Linha divisória e espaço */}
                <div className="flex justify-between items-center">
                  {" "}
                  {/* Alinha texto e botão */}
                  <span>Alternar Tema:</span>
                  <ThemeToggleButton />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
