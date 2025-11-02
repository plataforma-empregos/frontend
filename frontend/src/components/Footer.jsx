import Logo from "./Logo";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={`${styles.footerColumn} ${styles.logoColumn}`}>
            <Logo />
            <p className={styles.footerDescription}>
              Ótima plataforma para o candidato a emprego apaixonado por
              startups. Encontre o emprego dos seus sonhos mais fácil.
            </p>
          </div>

          <div className={styles.linksWrapper}>
            <div className={styles.footerColumn}>
              <h4 className={styles.titleColumnStandard}>Sobre</h4>
              <Link to="/companies" onClick={() => window.scrollTo(0, 0)}>
                Empresas
              </Link>
              <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>
                Termos
              </Link>
              <Link to="/termsofuse" onClick={() => window.scrollTo(0, 0)}>
                Termos de Uso
              </Link>
              <Link to="/advice" onClick={() => window.scrollTo(0, 0)}>
                Conselhos
              </Link>
              <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>
                Política de Privacidade
              </Link>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.titleColumnStandard}>Recursos</h4>
              <Link to="/help-docs" onClick={() => window.scrollTo(0, 0)}>
                Documentos de Ajuda
              </Link>
              <Link to="/guide" onClick={() => window.scrollTo(0, 0)}>
                Guia
              </Link>
              <Link to="/updates" onClick={() => window.scrollTo(0, 0)}>
                Atualizações
              </Link>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                Contate-nos
              </Link>
            </div>
          </div>

          <div className={`${styles.footerColumn} ${styles.newsletterColumn}`}>
            <h4 className={styles.titleColumnStandard}>
              Receba notificações de emprego
            </h4>
            <p>
              As últimas notícias sobre empregos, artigos enviados para sua
              caixa de entrada semanalmente.
            </p>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Endereço de Email" />
              <button>Inscrever-se</button>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>2025 @ TrampoMatch. Todos os direitos reservados.</p>
          <div className={styles.socialIcons}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
