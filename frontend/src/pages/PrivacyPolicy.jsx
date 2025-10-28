import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Política de Privacidade
        </h1>

        <p className="text-gray-700 mb-6 text-justify">
            Esta Política de Privacidade descreve como realizamos a coleta, o uso,
            o armazenamento, a proteção e o compartilhamento das informações
            pessoais dos usuários que utilizam nossa plataforma de intermediação
            de serviços e vagas de emprego. O objetivo é garantir total
            transparência sobre o tratamento de dados, conforme previsto na{" "}
            <strong>Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018)</strong>.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Coleta de Dados Pessoais
        </h2>
        <p className="text-gray-700 mb-4">
            1.1. Coletamos dados pessoais fornecidos diretamente pelo usuário
            durante o cadastro ou uso dos serviços, incluindo, mas não se limitando a:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Nome completo;</li>
            <li>E-mail e número de telefone;</li>
            <li>CPF (quando necessário para contratos ou verificações);</li>
            <li>
            Informações profissionais, como currículo, experiências e áreas de
            interesse;
            </li>
            <li>Dados de navegação, endereço IP e cookies.</li>
        </ul>
        <p className="text-gray-700 mb-6">
            1.2. A coleta ocorre de forma transparente e com o consentimento
            expresso do usuário.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Finalidade do Tratamento de Dados
        </h2>
        <p className="text-gray-700 mb-4">
            2.1. Os dados pessoais coletados são utilizados para:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Permitir o cadastro, autenticação e uso da plataforma;</li>
            <li>Facilitar a comunicação entre candidatos e empresas;</li>
            <li>
            Personalizar a experiência do usuário e exibir vagas compatíveis com
            seu perfil;
            </li>
            <li>Enviar notificações e comunicações relacionadas aos serviços;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Base Legal para o Tratamento
        </h2>
        <p className="text-gray-700 mb-6">
            O tratamento de dados é realizado conforme as hipóteses legais da
            LGPD, incluindo consentimento do titular, cumprimento de obrigação
            legal, execução de contrato e legítimo interesse, sempre observando os
            direitos e liberdades do usuário.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Compartilhamento de Dados
        </h2>
        <p className="text-gray-700 mb-4">
            4.1. Os dados poderão ser compartilhados nas seguintes situações:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>
            Com empresas e recrutadores cadastrados na plataforma, para fins de
            recrutamento e seleção;
            </li>
            <li>
            Com prestadores de serviços técnicos, como hospedagem e segurança;
            </li>
            <li>
            Quando exigido por lei, decisão judicial ou autoridade competente.
            </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Armazenamento e Segurança
        </h2>
        <p className="text-gray-700 mb-6">
            Adotamos medidas técnicas e administrativas adequadas para proteger os
            dados pessoais contra acessos não autorizados, perdas ou alterações.
            Os dados são armazenados em ambiente seguro e mantidos pelo tempo
            necessário para as finalidades declaradas ou exigências legais.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            6. Direitos do Titular dos Dados
        </h2>
        <p className="text-gray-700 mb-4">
            O usuário tem direito de acessar, corrigir, atualizar ou excluir seus
            dados, além de solicitar anonimização, portabilidade ou revogação do
            consentimento, conforme previsto na LGPD.
        </p>
        <p className="text-gray-700 mb-6">
            As solicitações podem ser realizadas através do canal de contato
            indicado nesta política.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            7. Uso de Cookies
        </h2>
        <p className="text-gray-700 mb-6">
            Utilizamos cookies para melhorar sua experiência, analisar o tráfego e
            personalizar conteúdos. O usuário pode configurar seu navegador para
            recusá-los, ciente de que certas funcionalidades podem ser afetadas.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            8. Responsabilidade e Boas Práticas
        </h2>
        <p className="text-gray-700 mb-6">
            A plataforma compromete-se a preservar a confidencialidade e a
            integridade dos dados pessoais. O usuário também deve manter seus
            dados atualizados e proteger suas credenciais de acesso.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            9. Alterações desta Política
        </h2>
        <p className="text-gray-700 mb-6">
            Esta Política de Privacidade poderá ser atualizada periodicamente. Em
            caso de alterações significativas, o usuário será notificado e poderá
            revisar e aceitar novamente os termos.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
            10. Contato e Exercício de Direitos
        </h2>
        <p className="text-gray-700 mb-2">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política,
            entre em contato com o Encarregado de Proteção de Dados (DPO) através
            do e-mail:
        </p>
        <p className="text-blue-600 font-medium mb-6">
            privacidade@trampomatch.com.br
        </p>

        <p className="text-gray-600 text-sm text-center mt-8">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>
        <div className="mt-10 flex items-center justify-between border-t pt-4">
            <Link to="/" className="text-blue-600 hover:underline text-sm">
            ← Voltar para o site
            </Link>
        </div>
        </div>
    </div>
    );
};

export default PrivacyPolicy;
