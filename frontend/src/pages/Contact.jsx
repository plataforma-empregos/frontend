import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", form);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setForm({ name: "", email: "", subject: "", message: "", consent: false });
  };

  return (
    <div className="min-h-screen bg-[var(--clr-bg-secondary)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-[var(--clr-bg-primary)] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[var(--clr-text-primary)] mb-4 text-center">
          Contate-nos
        </h1>
        <p className="text-center text-[var(--clr-text-secondary)] mb-8">
          Envie uma mensagem para nossa equipe. Responderemos o mais breve
          possível.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--clr-text-primary)] mb-1">
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-[var(--clr-footer-border)] rounded-lg px-4 py-2 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clr-accent-secondary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--clr-text-primary)] mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-[var(--clr-footer-border)] rounded-lg px-4 py-2 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clr-accent-secondary)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--clr-text-primary)] mb-1">
              Assunto
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full border border-[var(--clr-footer-border)] rounded-lg px-4 py-2 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clr-accent-secondary)]"
            >
              <option value="">Selecione um assunto</option>
              <option value="Suporte">Suporte técnico</option>
              <option value="Sugestao">Sugestão</option>
              <option value="Parceria">Parceria</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--clr-text-primary)] mb-1">
              Mensagem
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-[var(--clr-footer-border)] rounded-lg px-4 py-2 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--clr-accent-secondary)]"
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              required
              className="h-4 w-4 text-[var(--clr-accent-primary)] border-[var(--clr-footer-border)] rounded focus:ring-[var(--clr-accent-secondary)]"
            />
            <label className="ml-2 block text-sm text-[var(--clr-text-secondary)]">
              Autorizo o uso dos meus dados para retorno do contato.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] py-2 rounded-lg font-semibold hover:bg-[var(--clr-accent-tertiary)] transition-colors"
          >
            Enviar mensagem
          </button>
        </form>

        <div className="mt-10 border-t border-[var(--clr-footer-border)] pt-6 text-center text-sm text-[var(--clr-text-secondary)]">
          <p>Ou, se preferir, entre em contato diretamente:</p>
          <p className="mt-2">
            <span className="text-[var(--clr-accent-secondary)] font-medium">
              suporte@trampomatch.com.br
            </span>
          </p>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-[var(--clr-footer-border)] pt-4">
          <Link
            to="/"
            className="text-[var(--clr-accent-secondary)] hover:underline text-sm"
          >
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
