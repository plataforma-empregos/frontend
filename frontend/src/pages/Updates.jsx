import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// Atualizações de exemplo
const updatesData = [
  {
    id: 1,
    title: "Novo sistema de mensagens internas",
    date: "2025-10-15",
    description:
      "Agora é possível enviar mensagens diretas entre prestadores e contratantes com histórico completo e notificações em tempo real.",
    category: "Novas Funcionalidades",
  },
  {
    id: 2,
    title: "Melhoria no painel de vagas",
    date: "2025-10-10",
    description:
      "O painel de vagas foi otimizado com filtros avançados, permitindo busca por localização, categoria e data de publicação.",
    category: "Melhorias",
  },
  {
    id: 3,
    title: "Atualização do contrato digital",
    date: "2025-10-05",
    description:
      "O contrato digital agora permite anexar arquivos adicionais e assinatura múltipla de forma mais rápida e segura.",
    category: "Novas Funcionalidades",
  },
  {
    id: 4,
    title: "Novos recursos para perfis profissionais",
    date: "2025-09-28",
    description:
      "Perfis agora podem adicionar portfólios em vídeo e links de redes externas para aumentar a visibilidade.",
    category: "Melhorias",
  },
  {
    id: 5,
    title: "Sistema de notificações aprimorado",
    date: "2025-09-20",
    description:
      "Receba alertas em tempo real sobre mensagens, novas vagas e atualizações importantes na plataforma.",
    category: "Correções",
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

  // Filtra atualizações por categoria
  const filteredUpdates = useMemo(() => {
    if (categoryFilter === "Todas") return updatesData;
    return updatesData.filter((u) => u.category === categoryFilter);
  }, [categoryFilter]);

  const categories = ["Todas", "Novas Funcionalidades", "Correções", "Melhorias"];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Atualizações
        </h1>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                categoryFilter === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de atualizações */}
        <div className="space-y-6 text-gray-700 mt-4">
          {filteredUpdates.map((update) => (
            <article
              key={update.id}
              className="border-l-4 border-blue-600 pl-4 py-3 hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold mb-1">{update.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{update.date} · {update.category}</p>
              <p>{update.description}</p>
            </article>
          ))}

          {filteredUpdates.length === 0 && (
            <p className="text-gray-500 text-center mt-6">Nenhuma atualização encontrada para esta categoria.</p>
          )}
        </div>

        {/* Voltar */}
        <div className="mt-10 flex items-center justify-between border-t pt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Voltar ao topo"
        >
          ↑ Topo
        </button>
      )}
    </div>
  );
}
