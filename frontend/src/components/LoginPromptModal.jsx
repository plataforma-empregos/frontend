import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function LoginPromptModal({ isOpen, onRequestClose }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "500px",
      borderRadius: "8px",
      padding: "0",
      border: "none",
      background: "transparent",
      zIndex: 1051,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1050,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Acesso Restrito"
    >
      <div className="p-6 text-center bg-[var(--clr-bg-primary)] rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-[var(--clr-text-primary)]">
          Recurso Exclusivo para Membros
        </h2>
        <p className="mb-6 text-[var(--clr-text-secondary)]">
          Para acessar esta funcionalidade e explorar todas as oportunidades,
          por favor, faça login ou crie sua conta.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            onClick={onRequestClose}
            className="px-4 py-2 bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] rounded hover:bg-[var(--clr-accent-tertiary)] transition"
          >
            Fazer Login
          </Link>
          <Link
            to="/register"
            onClick={onRequestClose}
            className="px-4 py-2 bg-[var(--clr-bg-secondary)] text-[var(--clr-text-primary)] rounded hover:bg-[var(--clr-text-muted)] hover:text-[var(--clr-text-inverse)] transition"
          >
            Cadastrar-se
          </Link>
        </div>
        <button
          onClick={onRequestClose}
          className="mt-6 text-sm text-[var(--clr-text-muted)] hover:underline"
        >
          Continuar navegando
        </button>
      </div>
    </Modal>
  );
}
