import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const termsSections = [
  {
    id: 1,
    title: "Introdução",
    content:
      "Bem-vindo ao TrampoMATCH — plataforma que conecta contratantes e prestadores de serviços. Ao utilizar nossos serviços, você concorda integralmente com estes Termos de Uso e com nossa Política de Privacidade.",
  },
  {
    id: 2,
    title: "Aceitação dos Termos",
    content:
      "Ao se cadastrar ou acessar o TrampoMATCH, você declara ter capacidade legal para aceitar estes Termos. Caso não concorde, não utilize a plataforma.",
  },
  {
    id: 3,
    title: "Cadastro e Conta",
    content:
      "Os usuários devem fornecer informações verdadeiras e atualizadas. O usuário é o único responsável por manter a confidencialidade de suas credenciais e pelas ações realizadas em sua conta.",
  },
  {
    id: 4,
    title: "Uso da Plataforma",
    content:
      "O TrampoMATCH atua como um intermediador tecnológico entre contratantes e prestadores de serviços. A plataforma oferece recursos como publicação de vagas, busca de profissionais, envio de propostas, orçamento em vídeo e avaliações. A plataforma não se responsabiliza pelos contratos firmados diretamente entre as partes.",
  },
  {
    id: 5,
    title: "Conteúdo do Usuário",
    content:
      "O usuário é responsável pelo conteúdo que publica, incluindo descrições, imagens e vídeos. É proibido postar conteúdo ofensivo, ilegal, discriminatório, difamatório ou que viole direitos de terceiros.",
  },
  {
    id: 6,
    title: "Proteção de Dados (LGPD)",
    content:
      "O TrampoMATCH trata os dados pessoais conforme a Lei nº 13.709/2018 (LGPD). Os dados coletados são utilizados apenas para prestação dos serviços da plataforma. O usuário pode solicitar acesso, correção ou exclusão de seus dados pelo canal de contato informado na Política de Privacidade.",
  },
  {
    id: 7,
    title: "Obrigações do Usuário",
    content:
      "Fornecer informações verdadeiras e atualizadas. Respeitar a legislação vigente e os direitos de terceiros. Não realizar práticas fraudulentas ou enganosas.",
  },
  {
    id: 8,
    title: "Propriedade Intelectual",
    content:
      "Todo o conteúdo, design e código do TrampoMATCH pertencem à plataforma ou aos respectivos licenciadores. O uso indevido poderá resultar em responsabilização civil e penal.",
  },
  {
    id: 9,
    title: "Limitação de Responsabilidade",
    content:
      "O TrampoMATCH não se responsabiliza por danos diretos ou indiretos decorrentes do uso da plataforma. Recomenda-se que as partes verifiquem referências e garantias antes de firmar qualquer contrato.",
  },
  {
    id: 10,
    title: "Alterações dos Termos",
    content:
      "O TrampoMATCH pode modificar estes Termos a qualquer momento. As alterações serão comunicadas de forma visível no site, e o uso contínuo da plataforma implicará a aceitação das novas condições.",
  },
  {
    id: 11,
    title: "Contato",
    content:
      "Para dúvidas ou solicitações relacionadas a estes Termos, entre em contato com: termos@trampomatch.com.br",
  },
  {
    id: 12,
    title: "Disposições Finais",
    content:
      "Estes Termos são regidos pelas leis brasileiras. Eventuais disputas serão solucionadas no foro da comarca de domicílio do usuário, salvo disposição legal em contrário.",
  },
];

export default function Termsofuse() {
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
          Termos de Uso — TrampoMATCH
        </h1>

        <div className="space-y-4 mt-4 text-gray-700">
          {termsSections.map((section) => (
            <div key={section.id} className="border-b border-gray-200 last:border-b-0">
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
