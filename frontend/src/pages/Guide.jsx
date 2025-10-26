import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 

// Array de seções. Cada objeto representa uma seção com id, título e conteúdo
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

// Componente principal da página de guia interativo
export default function Guide() {
  // Estado que controla se o botão "Voltar ao Topo" deve aparecer
  const [showButton, setShowButton] = useState(false);

  // Estado que controla quais seções estão abertas (visíveis)
  const [openSections, setOpenSections] = useState({});

  // useEffect é usado para executar código quando o componente é montado
  useEffect(() => {
    // Rola a página para o topo ao abrir o guia
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Função que verifica a posição de rolagem para mostrar/esconder o botão "Voltar ao Topo"
    const handleScroll = () => setShowButton(window.scrollY > 300);

    // Adiciona um "ouvinte" de rolagem que dispara handleScroll sempre que o usuário rola a página
    window.addEventListener("scroll", handleScroll);

    // Limpa o "ouvinte" quando o componente é desmontado para evitar problemas de performance
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para rolar a página de volta ao topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Função que alterna a visibilidade de uma seção (abre se estiver fechada e fecha se estiver aberta)
  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Container principal da página */}
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Título do guia */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Guia Interativo
        </h1>

        {/* Área que exibe todas as seções do guia */}
        <div className="space-y-4 mt-4 text-gray-700">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              {/* Botão que permite abrir ou fechar cada seção */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left flex justify-between items-center py-3 focus:outline-none"
              >
                {/* Título da seção */}
                <span className="text-lg font-semibold">{section.title}</span>
                {/* Sinal + ou − para indicar se a seção está aberta ou fechada */}
                <span className="text-gray-500">
                  {openSections[section.id] ? "−" : "+"}
                </span>
              </button>

              {/* Conteúdo da seção, só aparece se a seção estiver aberta */}
              {openSections[section.id] && (
                <div className="mt-2 text-gray-700 text-sm leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Link para voltar à página inicial */}
        <div className="mt-10 flex items-center justify-between border-t pt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>

      {/* Botão "Voltar ao Topo", aparece apenas quando showButton é true */}
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
