import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: 1,
    title: "Introdução",
    content:
      "Este guia foi elaborado para ajudar prestadores e contratantes a aproveitarem ao máximo os recursos do TrampoMATCH. Você encontrará orientações passo a passo sobre cadastro, busca de oportunidades, comunicação, gestão de contratos e boas práticas.",
  },
  {
    id: 2,
    title: "Criando seu Perfil",
    content:
      "Preencha informações de contato completas, adicione experiências e qualificações, inclua portfólio de trabalhos anteriores ou links externos, use uma foto profissional e descrição objetiva.",
  },
  {
    id: 3,
    title: "Encontrando Oportunidades",
    content:
      "Utilize filtros por categoria, localização e valor do serviço. Salve oportunidades interessantes, leia atentamente a descrição antes de enviar proposta e compare múltiplas oportunidades.",
  },
  {
    id: 4,
    title: "Comunicação e Contratos",
    content:
      "Use o chat interno da plataforma, envie propostas detalhadas, assine contratos digitais e mantenha sempre profissionalismo e pontualidade.",
  },
  {
    id: 5,
    title: "Boas Práticas",
    content:
      "Mantenha seu perfil atualizado, peça feedbacks, participe da comunidade, respeite prazos e comunique mudanças ou imprevistos rapidamente.",
  },
  {
    id: 6,
    title: "Conclusão",
    content:
      "Seguindo este guia, você estará melhor preparado para aproveitar todas as funcionalidades do TrampoMATCH, garantindo mais eficiência, segurança e sucesso em seus projetos.",
  },
];

export default function Guide() {
  const [showButton, setShowButton] = useState(false);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[var(--clr-bg-secondary)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl w-full bg-[var(--clr-bg-primary)] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[var(--clr-text-primary)] mb-6 text-center">
          Guia Interativo
        </h1>

        <div className="space-y-4 mt-4 text-[var(--clr-text-primary)]">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-[var(--clr-footer-border)] last:border-b-0"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left flex justify-between items-center py-3 focus:outline-none 
                           bg-[var(--clr-bg-primary)] hover:bg-[var(--clr-bg-secondary)]
                           transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-[var(--clr-text-primary)]">
                  {section.title}
                </span>
                <span className="text-[var(--clr-text-secondary)]">
                  {openSections[section.id] ? "−" : "+"}
                </span>
              </button>

              {openSections[section.id] && (
                <div className="mt-2 text-[var(--clr-text-secondary)] text-sm leading-relaxed p-2">
                  {section.content}
                </div>
              )}
            </div>
          ))}
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
