import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const adviceSections = [
  {
    id: 1,
    title: "Introdução",
    content:
      "Nesta seção, reunimos conselhos e orientações para ajudar você a se destacar na sua jornada profissional. As dicas foram elaboradas para otimizar seu perfil, melhorar sua performance em entrevistas e fortalecer suas oportunidades no TrampoMATCH.",
  },
  {
    id: 2,
    title: "Melhore seu Perfil Profissional",
    content:
      "Atualize regularmente suas experiências e qualificações. Personalize sua descrição conforme o tipo de vaga que você busca. Use uma foto profissional e biografia clara. Peça recomendações de colegas ou ex-clientes.",
  },
  {
    id: 3,
    title: "Preparação para Entrevistas",
    content:
      "Pesquise sobre a empresa e o cargo antes da entrevista. Treine respostas para perguntas comuns de recrutadores. Demonstre segurança e clareza ao explicar suas experiências. Evite atrasos e mantenha uma postura profissional.",
  },
  {
    id: 4,
    title: "Desenvolvimento de Carreira",
    content:
      "Invista em cursos e certificações relevantes para sua área. Participe de eventos e comunidades profissionais. Estabeleça metas claras e revise seu progresso periodicamente. Esteja aberto a feedbacks construtivos e novas oportunidades.",
  },
  {
    id: 5,
    title: "Dicas Extras",
    content:
      "Seja autêntico e transparente — isso gera confiança em contratantes. Utilize o TrampoMATCH para explorar novas áreas e testar diferentes formatos de trabalho. Mantenha equilíbrio entre trabalho e vida pessoal.",
  },
  {
    id: 6,
    title: "Conclusão",
    content:
      "Seguindo essas orientações, você estará mais preparado para conquistar as melhores oportunidades no mercado e construir uma trajetória sólida no TrampoMATCH. Lembre-se: sucesso profissional é fruto de aprendizado contínuo e dedicação.",
  },
];

export default function Advice() {
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Conselhos
        </h1>

        <div className="space-y-4 mt-4 text-gray-700">
          {adviceSections.map((section) => (
            <div
              key={section.id}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full text-left flex justify-between items-center py-3 focus:outline-none"
              >
                <span className="text-lg font-semibold">{section.title}</span>
                <span className="text-gray-500">
                  {openSections[section.id] ? "−" : "+"}
                </span>
              </button>
              {openSections[section.id] && (
                <div className="mt-2 text-gray-700 text-sm leading-relaxed">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>

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
