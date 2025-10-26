import React, { useState, useEffect, useMemo } from "react"; 
import { Link } from "react-router-dom"; 

// Lista de atualizações do sistema (exemplo)
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
    description:
      "Novos artigos de ajuda e tutoriais integrados na plataforma.",
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
];

// Componente principal da página de atualizações
export default function Updates() {
  // Estado que controla se o botão "Voltar ao Topo" deve aparecer
  const [showButton, setShowButton] = useState(false);

  // Estado que controla qual categoria de atualização está selecionada
  const [categoryFilter, setCategoryFilter] = useState("Todas");

  // useEffect executa código quando o componente é carregado
  useEffect(() => {
    // Faz a página começar no topo ao abrir a página de atualizações
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Função que verifica a posição da rolagem
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); 
      // Se o usuário rolou mais de 300 pixels, mostra o botão
    };

    // Adiciona "ouvinte" para monitorar a rolagem
    window.addEventListener("scroll", handleScroll);

    // Remove o "ouvinte" ao desmontar o componente para evitar problemas
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para rolar a página de volta ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lista de categorias disponíveis para filtro
  const categories = ["Todas", "Novas Funcionalidades", "Correções", "Melhorias"];

  // Filtra as atualizações de acordo com a categoria selecionada
  const filteredUpdates = useMemo(() => {
    if (categoryFilter === "Todas") return updatesData;
    return updatesData.filter((u) => u.category === categoryFilter);
  }, [categoryFilter]); // useMemo só recalcula quando categoryFilter muda

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Container principal da página */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Atualizações
        </h1>

        {/* Botões de filtro de categoria */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)} 
              // Ao clicar, muda a categoria selecionada
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
              {/* Título da atualização */}
              <h2 className="text-xl font-semibold mb-1">{update.title}</h2>
              {/* Data e categoria */}
              <p className="text-sm text-gray-500 mb-2">{update.date} · {update.category}</p>
              {/* Descrição da atualização */}
              <p>{update.description}</p>
            </article>
          ))}

          {/* Mensagem caso não haja atualizações na categoria selecionada */}
          {filteredUpdates.length === 0 && (
            <p className="text-gray-500 text-center mt-6">
              Nenhuma atualização encontrada para esta categoria.
            </p>
          )}
        </div>

        {/* Link para voltar à página inicial */}
        <div className="mt-10 flex items-center justify-between border-t pt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>

      {/* Botão Voltar ao Topo, aparece apenas se showButton for true */}
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
