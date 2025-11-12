import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Como criar e editar meu perfil profissional?",
    answer:
      "Acesse o menu 'Perfil', clique em 'Editar' e preencha suas informações pessoais, experiências, habilidades e portfólio. Salve para atualizar seu perfil.",
  },
  {
    question: "Como publicar uma oportunidade de trabalho?",
    answer:
      "No menu 'Vagas', clique em 'Nova oportunidade', preencha título, descrição, requisitos, local e prazo. Publique para que candidatos vejam sua vaga.",
  },
  {
    question: "Como gerenciar candidaturas recebidas?",
    answer:
      "Em 'Minhas vagas', selecione a vaga desejada e visualize os candidatos. Você pode aceitar, rejeitar ou enviar mensagens diretamente aos candidatos.",
  },
  {
    question: "O que fazer em caso de problemas com a plataforma?",
    answer:
      "Entre em contato com nosso suporte pelo menu 'Contato'. Detalhe o problema e envie capturas de tela, se necessário, para agilizar o atendimento.",
  },
];

const tutorials = [
  {
    title: "Como otimizar seu perfil para mais visibilidade",
    steps: [
      "Adicione foto de perfil profissional.",
      "Descreva suas experiências com clareza.",
      "Liste suas habilidades e certificações.",
      "Mantenha seu portfólio atualizado.",
      "Revise regularmente para manter o perfil ativo.",
    ],
  },
];

export default function HelpDocs() {
  const [showButton, setShowButton] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => {
      if (window.scrollY > 300) setShowButton(true);
      else setShowButton(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[var(--clr-bg-secondary)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl w-full bg-[var(--clr-bg-primary)] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[var(--clr-text-primary)] mb-6 text-center">
          Documentos de Ajuda
        </h1>

        <section className="space-y-6 text-[var(--clr-text-primary)] mt-4">
          <h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
          <p>
            Nesta seção, reunimos tutoriais, perguntas frequentes e guias de uso
            da plataforma <strong>TrampoMATCH</strong>. Aqui você encontrará
            orientações para otimizar seu perfil, gerenciar oportunidades e
            solucionar dúvidas comuns.
          </p>
        </section>

        <section className="space-y-6 mt-6 text-[var(--clr-text-primary)]">
          <h2 className="text-xl font-semibold mb-2">
            2. Tutoriais Passo a Passo
          </h2>
          {tutorials.map((tut, idx) => (
            <div
              key={idx}
              className="border-l-4 border-[var(--clr-accent-primary)] pl-4"
            >
              <h3 className="text-lg font-semibold mb-2">{tut.title}</h3>
              <ol className="list-decimal list-inside space-y-1">
                {tut.steps.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </section>

        <section className="space-y-6 mt-6 text-[var(--clr-text-primary)]">
          <h2 className="text-xl font-semibold mb-2">
            3. Perguntas Frequentes
          </h2>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[var(--clr-footer-border)] rounded-lg p-4 cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            >
              <h3 className="font-semibold flex justify-between items-center">
                {faq.question}
                <span className="text-[var(--clr-accent-secondary)]">
                  {openFAQ === idx ? "-" : "+"}
                </span>
              </h3>
              {openFAQ === idx && (
                <p className="mt-2 text-[var(--clr-text-secondary)]">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </section>

        <section className="space-y-6 mt-6 text-[var(--clr-text-primary)]">
          <h2 className="text-xl font-semibold mb-2">4. Dicas Rápidas</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mantenha seu perfil atualizado.</li>
            <li>
              Responda rapidamente às mensagens de candidatos ou contratantes.
            </li>
            <li>
              Use fotos e portfólio de qualidade para aumentar visibilidade.
            </li>
            <li>Verifique notificações regularmente.</li>
          </ul>
        </section>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--clr-footer-border)] pt-4">
          <Link
            to="/"
            className="text-[var(--clr-accent-secondary)] hover:underline text-sm"
          >
            ← Voltar para o site
          </Link>
        </div>
      </div>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] px-4 py-2 rounded-full shadow-lg hover:bg-[var(--clr-accent-tertiary)] transition duration-300"
          aria-label="Voltar ao topo"
        >
          ↑ Topo
        </button>
      )}
    </div>
  );
}
