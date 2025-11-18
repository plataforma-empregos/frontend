import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useState } from "react";
import { subscribeNewsletter } from "../services/api";
import styles from "../styles/Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // NOVO → mensagem de sucesso/erro
  const [status, setStatus] = useState({ type: "", message: "" });

  // regex bem simples (não “trava” e funciona para 99% dos casos)
  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);

  const handleSubscribe = async () => {
    // limpa as mensagens anteriores
    setStatus({ type: "", message: "" });

    if (!email.trim() || !validateEmail(email)) {
      setStatus({
        type: "error",
        message: "Por favor, insira um e-mail válido.",
      });
      return;
    }

    try {
      setLoading(true);

      await subscribeNewsletter(email); // chamada da API

      setStatus({
        type: "success",
        message: "Inscrição realizada com sucesso! 🎉",
      });

      setEmail("");

    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.message || "Erro ao realizar inscrição. Tente novamente.",
      });

    } finally {
      setLoading(false);
    }
  };

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
              <input
                type="email"
                placeholder="Endereço de Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <button onClick={handleSubscribe} disabled={loading}>
                {loading ? "Enviando..." : "Inscrever-se"}
              </button>
            </div>

            {/* MENSAGENS DE STATUS */}
            {status.message && (
              <p
                className={
                  status.type === "error"
                    ? styles.errorMessage
                    : styles.successMessage
                }
              >
                {status.message}
              </p>
            )}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>2025 @ TrampoMatch. Todos os direitos reservados.</p>
          <div className={styles.socialIcons}>
            <a
              href="https://instagram.com/trampomatch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com/in/trampomatch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://twitter.com/trampomatch"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
