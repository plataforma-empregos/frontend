import Modal from "react-modal";

Modal.setAppElement("#root");

export default function TermsModal({ isOpen, onRequestClose }) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "800px",
      maxHeight: "80vh",
      borderRadius: "8px",
      padding: "2rem",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 50,
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Termos de Serviço"
    >
      <div>
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">
          Termos de Serviço
        </h2>
        <div className="space-y-4 text-gray-700 overflow-y-auto max-h-[60vh] pr-2">
          <p className="text-sm text-gray-500">
            <em>Última atualização: 2 de outubro de 2025</em>
          </p>

          <h3 className="text-lg font-semibold">1. Aceitação dos Termos</h3>
          <p>
            Bem-vindo ao TrampoMatch! Ao criar uma conta ou usar nossa
            plataforma, você concorda com estes Termos de Serviço. Se não
            concordar, por favor, não utilize nossos serviços.
          </p>

          <h3 className="text-lg font-semibold">2. Nossos Serviços</h3>
          <p>
            O TrampoMatch é uma plataforma que conecta profissionais
            ("Candidatos") a oportunidades de trabalho publicadas por empresas
            ("Recrutadores"). Atuamos como intermediários e não somos parte em
            qualquer contrato entre usuários.
          </p>

          <h3 className="text-lg font-semibold">3. Contas de Usuário</h3>
          <p>
            Ao criar uma conta, você se compromete a fornecer informações
            verdadeiras e a manter sua senha segura. Você é responsável por
            todas as atividades em sua conta.
          </p>

          <h3 className="text-lg font-semibold">
            4. Responsabilidades dos Usuários
          </h3>
          <p>
            <strong>Candidatos:</strong> Devem manter as informações do perfil
            precisas e atualizadas.
          </p>
          <p>
            <strong>Recrutadores:</strong> Devem publicar apenas vagas reais e
            lícitas, sem exigir qualquer tipo de pagamento dos candidatos e
            respeitando as leis de privacidade, como a LGPD.
          </p>

          <h3 className="text-lg font-semibold">
            5. Uso Proibido da Plataforma
          </h3>
          <p>É estritamente proibido usar o TrampoMatch para:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Publicar conteúdo falso, fraudulento ou ilegal.</li>
            <li>Praticar assédio, spam ou qualquer forma de discriminação.</li>
            <li>
              Tentar obter acesso não autorizado aos nossos sistemas (hacking)
              ou extrair dados em massa (scraping).
            </li>
          </ul>

          <h3 className="text-lg font-semibold">6. Privacidade dos Dados</h3>
          <p>
            Sua privacidade é fundamental. Nossa{" "}
            <strong>Política de Privacidade</strong>, que é parte destes Termos,
            detalha como tratamos seus dados pessoais. Ao concordar com estes
            Termos, você também concorda com nossa Política de Privacidade.
          </p>

          <h3 className="text-lg font-semibold">
            7. Limitação de Responsabilidade
          </h3>
          <p>
            A plataforma é fornecida "no estado em que se encontra". Não nos
            responsabilizamos pela veracidade das vagas, pelas informações dos
            perfis ou pelo resultado de qualquer processo seletivo.
          </p>

          <h3 className="text-lg font-semibold">8. Alterações nos Termos</h3>
          <p>
            Podemos modificar estes Termos a qualquer momento. Notificaremos os
            usuários sobre mudanças significativas. O uso contínuo da plataforma
            após as alterações significa que você aceita os novos Termos.
          </p>
        </div>
        <div className="flex justify-end mt-6 border-t pt-4">
          <button
            onClick={onRequestClose}
            className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition font-semibold"
          >
            Entendido, Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
