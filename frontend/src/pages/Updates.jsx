import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const updatesData = [
  {
    id: 1,
    title: "Novos recursos para perfis",
    date: "2025-09-12",
    description:
      "Perfis agora podem adicionar curriculum e links de redes externas para aumentar a visibilidade.",
    category: "Melhorias",
  },
  {
    id: 2,
    title: "Melhoria no painel de vagas",
    date: "2025-09-17",
    description:
      "O painel de vagas foi otimizado com filtros avançados, permitindo busca por localização, categoria e data de publicação.",
    category: "Melhorias",
  },
  {
    id: 3,
    title: "Sistema de notificações aprimorado",
    date: "2025-09-29",
    description:
      "Receba alertas sobre mensagens, novas vagas e atualizações importantes na plataforma.",
    category: "Correções",
  },
  {
    id: 4,
    title: "Nova interface para dispositivos móveis",
    date: "2025-10-03",
    description:
      "O layout foi totalmente otimizado para celular e tablet, garantindo melhor usabilidade e experiência em qualquer tela.",
    category: "Melhorias",
  },
  {
    id: 5,
    title: "Correção de bugs",
    date: "2025-10-18",
    description:
      "Resolvemos problemas que ocasionalmente impediam o funciomento da plataforma.",
    category: "Correções",
  },
  {
    id: 6,
    title: "Filtro de vagas",
    date: "2025-10-23",
    description:
      "Agora é possível filtrar vagas de acordo com o desejado, facilitando encontrar oportunidades compatíveis com seu perfil.",
    category: "Novas Funcionalidades",
  },
  {
    id: 7,
    title: "Sistema de Ajuda",
    date: "2025-10-25",
    description: "Novos artigos de ajuda e tutoriais integrados na plataforma.",
    category: "Novas Funcionalidades",
  },
  {
    id: 8,
    title: "Atualização de segurança do login",
    date: "2025-10-27",
    description:
      "Implementamos autenticação com criptografia avançada para aumentar a segurança da sua conta.",
    category: "Correções",
  },
  {
    id: 9,
    title: "Dark Mode e Página de Vagas",
    date: "2025-10-27",
    description:
      "Adicionamos o modo escuro para melhor conforto visual e uma nova página dedicada para listagem de vagas.",
    category: "Novas Funcionalidades",
  },
];

export default function Updates() {
  const [showButton, setShowButton] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    "Todas",
    "Novas Funcionalidades",
    "Correções",
    "Melhorias",
  ];

  const filteredUpdates = useMemo(() => {
    if (categoryFilter === "Todas") return updatesData;
    return updatesData.filter((u) => u.category === categoryFilter);
  }, [categoryFilter]);

  return (
    <div className="min-h-screen bg-[var(--clr-bg-secondary)] flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl w-full bg-[var(--clr-bg-primary)] rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[var(--clr-text-primary)] mb-6 text-center">
          Atualizações
        </h1>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                categoryFilter === cat
                  ? "bg-[var(--clr-accent-primary)] text-[var(--clr-text-inverse)] border-[var(--clr-accent-primary)]"
                  : "bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] border-[var(--clr-footer-border)] hover:bg-[var(--clr-bg-secondary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-6 text-[var(--clr-text-primary)] mt-4">
          {filteredUpdates.map((update) => (
            <article
              key={update.id}
              className="border-l-4 border-[var(--clr-accent-primary)] pl-4 py-3 hover:bg-[var(--clr-bg-secondary)] transition"
            >
              <h2 className="text-xl font-semibold mb-1 text-[var(--clr-text-primary)]">
                {update.title}
              </h2>
              <p className="text-sm text-[var(--clr-text-secondary)] mb-2">
                {update.date} · {update.category}
              </p>
              <p>{update.description}</p>
            </article>
          ))}

          {filteredUpdates.length === 0 && (
            <p className="text-[var(--clr-text-secondary)] text-center mt-6">
              Nenhuma atualização encontrada para esta categoria.
            </p>
          )}
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
