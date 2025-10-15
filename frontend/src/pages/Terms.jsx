import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Termsofuse() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Termos de Uso — TrampoMATCH
        </h1>
            <p className="text-gray-600 text-sm text-center mt-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Introdução</h2>
            <p>
              Bem-vindo ao <strong>TrampoMATCH</strong> — plataforma que conecta contratantes e
              prestadores de serviços. Ao utilizar nossos serviços, você concorda integralmente
              com estes Termos de Uso e com nossa Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Aceitação dos Termos</h2>
            <p>
              Ao se cadastrar ou acessar o TrampoMATCH, você declara ter capacidade legal para
              aceitar estes Termos. Caso não concorde, não utilize a plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Cadastro e Conta</h2>
            <p>
              Os usuários devem fornecer informações verdadeiras e atualizadas. O usuário é o
              único responsável por manter a confidencialidade de suas credenciais e pelas ações
              realizadas em sua conta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Uso da Plataforma</h2>
            <p>
              O TrampoMATCH atua como um intermediador tecnológico entre contratantes e
              prestadores de serviços. A plataforma oferece recursos como publicação de vagas,
              busca de profissionais, envio de propostas, orçamento em vídeo e avaliações. A
              plataforma não se responsabiliza pelos contratos firmados diretamente entre as
              partes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Conteúdo do Usuário</h2>
            <p>
              O usuário é responsável pelo conteúdo que publica, incluindo descrições, imagens e
              vídeos. É proibido postar conteúdo ofensivo, ilegal, discriminatório, difamatório
              ou que viole direitos de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Proteção de Dados (LGPD)</h2>
            <p>
              O TrampoMATCH trata os dados pessoais conforme a Lei nº 13.709/2018 (LGPD). Os
              dados coletados são utilizados apenas para prestação dos serviços da plataforma.
              O usuário pode solicitar acesso, correção ou exclusão de seus dados pelo canal de
              contato informado na Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Obrigações do Usuário</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer informações verdadeiras e atualizadas.</li>
              <li>Respeitar a legislação vigente e os direitos de terceiros.</li>
              <li>Não realizar práticas fraudulentas ou enganosas.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, design e código do TrampoMATCH pertencem à plataforma ou aos
              respectivos licenciadores. O uso indevido poderá resultar em responsabilização
              civil e penal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Limitação de Responsabilidade</h2>
            <p>
              O TrampoMATCH não se responsabiliza por danos diretos ou indiretos decorrentes do
              uso da plataforma. Recomenda-se que as partes verifiquem referências e garantias
              antes de firmar qualquer contrato.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">10. Alterações dos Termos</h2>
            <p>
              O TrampoMATCH pode modificar estes Termos a qualquer momento. As alterações serão
              comunicadas de forma visível no site, e o uso contínuo da plataforma implicará a
              aceitação das novas condições.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Contato</h2>
            <p>
              Para dúvidas ou solicitações relacionadas a estes Termos, entre em contato com:
              <span className="block font-medium text-blue-600 mt-1">
                termos@trampomatch.com.br
              </span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">12. Disposições Finais</h2>
            <p>
              Estes Termos são regidos pelas leis brasileiras. Eventuais disputas serão
              solucionadas no foro da comarca de domicílio do usuário, salvo disposição legal em
              contrário.
            </p>
          </section>
        </div>

        <div className="mt-10 flex items-center justify-between border-t pt-4">
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
