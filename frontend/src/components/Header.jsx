// Ficheiro: Header.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import styles from "../styles/Header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className={styles.signupButton}>
                Cadastrar-se
              </Link>
            </li>
          </ul>
        </nav>

        <button className={styles.hamburgerButton} onClick={toggleMenu}>
          ☰
        </button>

        {isMenuOpen && (
          <nav className={styles.navMobile}>
            <ul className={styles.navLinksMobile}>
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
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
