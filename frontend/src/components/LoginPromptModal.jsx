import Modal from "react-modal";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export default function LoginPromptModal({ isOpen, onRequestClose }) {
  const customStyles = {};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Acesso Restrito"
    >
      <div className="p-6 text-center">
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
            onClick={onRequestClose} // Fecha o modal ao navegar
            className="px-4 py-2 bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] rounded hover:bg-[var(--clr-accent-tertiary)] transition"
          >
            Fazer Login
          </Link>
          <Link
            to="/register"
            onClick={onRequestClose} // Fecha o modal ao navegar
            className="px-4 py-2 bg-gray-200 text-[var(--clr-text-primary)] rounded hover:bg-gray-300 transition dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
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
