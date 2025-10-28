export default function Termsofuse() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 md:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Termos de Uso e Política de Privacidade
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed text-justify">
          <p>
            Ao utilizar nossa plataforma TrampoMatch (de prestação de serviços e intermediação de vagas de emprego), 
            você declara que leu, compreendeu e concorda com os termos abaixo. 
            É fundamental que você leia atentamente cada cláusula antes de aceitar.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">1. Finalidade da Plataforma</h2>
            <p>
              1.1. Nossa plataforma tem como objetivo conectar pessoas que buscam oportunidades de emprego 
              e empresas ou profissionais que oferecem vagas.
            </p>
            <p>
              1.2. O acesso e a utilização do sistema são condicionados à concordância com os presentes 
              Termos de Uso e à Política de Privacidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">2. Tratamento de Dados Pessoais (LGPD)</h2>
            <p>
              2.1. Ao se cadastrar e utilizar a plataforma, o usuário fornece voluntariamente dados pessoais 
              como nome, e-mail, telefone, currículo, experiências profissionais e outras informações necessárias 
              ao funcionamento do serviço.
            </p>
            <p>
              2.2. Esses dados serão tratados com base na <strong>Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>, 
              respeitando os princípios da finalidade, adequação, necessidade, segurança e transparência.
            </p>
            <p>
              2.3. O usuário tem direito a:
              <br />a) Confirmar a existência de tratamento de dados;
              <br />b) Acessar, corrigir ou atualizar suas informações;
              <br />c) Solicitar a exclusão de seus dados, quando aplicável;
              <br />d) Revogar o consentimento a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">3. Compartilhamento de Informações</h2>
            <p>
              3.1. As informações fornecidas poderão ser compartilhadas <strong>apenas</strong> com empresas parceiras 
              e recrutadores cadastrados na plataforma, sempre para fins de recrutamento e seleção de vagas.
            </p>
            <p>
              3.2. Não comercializamos, alugamos ou vendemos dados pessoais a terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">4. Segurança e Armazenamento</h2>
            <p>
              4.1. Adotamos medidas técnicas e administrativas adequadas para proteger os dados pessoais contra acessos 
              não autorizados, perdas, destruição ou alteração indevida.
            </p>
            <p>
              4.2. Os dados são armazenados em ambiente seguro e podem ser excluídos a pedido do usuário ou após o prazo 
              legal necessário para cumprimento de obrigações regulatórias.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">5. Responsabilidades do Usuário</h2>
            <p>
              5.1. O usuário compromete-se a fornecer informações verdadeiras e atualizadas em seu cadastro.
            </p>
            <p>
              5.2. É de responsabilidade do usuário manter a confidencialidade de seu login e senha, 
              não os compartilhando com terceiros.
            </p>
            <p>
              5.3. É proibida a utilização da plataforma para fins ilícitos, discriminatórios, ofensivos ou que possam 
              violar direitos de terceiros.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">6. Alterações nos Termos</h2>
            <p>
              6.1. Reservamo-nos o direito de atualizar estes Termos e a Política de Privacidade sempre que necessário, 
              informando os usuários sobre alterações relevantes.
            </p>
            <p>
              6.2. A continuidade do uso da plataforma após as alterações será considerada como aceite automático dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">7. Consentimento</h2>
            <p>
              7.1. Ao clicar em <strong>“Aceito os Termos de Uso e a Política de Privacidade”</strong>, o usuário concorda expressamente 
              com a coleta, uso e tratamento de seus dados pessoais nos moldes aqui descritos.
            </p>
            <p>
              7.2. O consentimento pode ser revogado a qualquer momento, mediante solicitação pelo canal de atendimento disponível 
              na plataforma.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}