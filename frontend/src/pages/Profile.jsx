import { useState, useEffect } from "react";
import { locationsData } from "../data/locationsData";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nome: "",             // Nome do usuário
    email: "",            // Email do usuário
    phone: "",            // Telefone/WhatsApp
    sobre: "",            // Campo "Fale sobre você"
    pais: "",             // País do usuário
    estado: "",           // Estado
    cidade: "",           // Cidade
    formacao: "",         // Formação acadêmica
    experiencia: "",      // Experiência profissional
    linkedin: "",         // Link do LinkedIn
    github: "",           // Link do GitHub
    instagram: "",        // Link do Instagram
    tecnologias: [],      // Lista de tecnologias selecionadas
    outraTecnologia: "",  // Campo "Outra tecnologia"
    foto: null,           // URL da foto de perfil
  });

  // Lista completa de tecnologias disponíveis como checkbox
  const tecnologiasList = [
    "React", "Angular", "Vue.js", "C#", "PHP", "Java", "JavaScript", "TypeScript",
    "R", "Kotlin", "Swift", "Flutter", "SQL", "Power BI", "Unity", "Unreal Engine",
    "Docker", "Kubernetes", "Git", "Linux", "MacOS", "Windows", "Pacote Office",
    "Photoshop", "Illustrator", "InDesign", "CorelDraw", "Canva", "Figma"
  ];

  // Hook que carrega dados do localStorage quando a página é aberta
useEffect(() => {
  const savedData = localStorage.getItem("userProfile");
  if (savedData) {
    const parsedData = JSON.parse(savedData);

    // Garante valores padrão se não existirem
    setFormData((prev) => ({
      ...prev,
      ...parsedData,
      tecnologias: parsedData.tecnologias || [],
    }));
  } else if (user) {
    setFormData((prev) => ({
      ...prev,
      nome: user.nome || "",
      email: user.email || "",
      phone: user.phone || "",
      tecnologias: [],
    }));
  }
}, [user]);

  // Função para atualizar o formulário conforme o usuário digita ou marca os checkbox
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Se o usuário mudar o país, resetamos estado e cidade
    if (name === "pais") {
      setFormData({ ...formData, pais: value, estado: "", cidade: "" });
    }
    // Se mudar o estado, resetamos a cidade
    else if (name === "estado") {
      setFormData({ ...formData, estado: value, cidade: "" });
    }
    // Atualiza normalmente os demais campos
    else {
      setFormData({ ...formData, [name]: value });
    }

    // Tratamento do upload de foto
    if (name === "foto") {
      const file = files[0]; 
      if (file && file.size <= 2 * 1024 * 1024) { 
        setFormData({ ...formData, foto: URL.createObjectURL(file) }); 
      } else {
        alert("Arquivo inválido ou maior que 2MB"); // Mensagem de erro
      }
      return; 
    }

    // Tratamento de checkbox de tecnologias
    if (type === "checkbox") {
      let updatedTecnologias = [...formData.tecnologias];
      if (checked) updatedTecnologias.push(value);          
      else updatedTecnologias = updatedTecnologias.filter((t) => t !== value); 
      setFormData({ ...formData, tecnologias: updatedTecnologias });
      return;
    }

    // Atualiza campos de texto normais
    setFormData({ ...formData, [name]: value });
  };

  // Função de localStorage quando o usuário clica em "Salvar"
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...formData, email: user?.email || formData.email };
    setFormData(updatedData);
    localStorage.setItem("userProfile", JSON.stringify(updatedData));
    alert("Perfil salvo com sucesso!");
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">

        {/* Cabeçalho: título e foto lado a lado em desktop, em coluna no mobile */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          
          {/* Título "Meu Perfil" */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">Meu Perfil</h1>

          {/* Foto do perfil */}
          <div className="flex flex-col items-center">
            {formData.foto ? (
              // Se houver foto, exibe imagem
              <img
                src={formData.foto}
                alt="Foto do perfil"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-700"
              />
            ) : (
              // Se não houver foto, exibe placeholder
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-blue-700">
                Sem Foto
              </div>
            )}
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className="mt-2 text-sm text-gray-600"
            />
          </div>
        </div>

        {/* Formulário principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block font-bold mb-1 text-gray-700">
              Contato
            </label>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-gray-700">
              Fale sobre você (max 300 caracteres)
            </label>
            <textarea
              name="sobre"
              maxLength={300}
              value={formData.sobre}
              onChange={handleChange}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

            <label className="block font-bold mb-5 text-gray-700">
              Localização
            </label>

            {/* Campo País */}
            <div className="mb-4">
              <label className="block font-medium mb-1 text-gray-700">País</label>
              <select
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Selecione um país</option>
                {Object.keys(locationsData).sort().map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
                <option value="Outro">Outro</option>
              </select>

              {/* Campo manual se for "Outro" */}
              {formData.pais === "Outro" && (
                <input
                  type="text"
                  name="outroPais"
                  value={formData.outroPais}
                  onChange={handleChange}
                  placeholder="Digite seu país"
                  className="w-full p-2 border rounded mt-2"
                />
              )}
            </div>

                {/* Campo Estado */}
                {formData.pais &&
                  formData.pais !== "Outro" &&
                  locationsData[formData.pais] && (
                    <div className="mb-4">
                      <label className="block font-medium mb-1 text-gray-700">Estado</label>
                      <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Selecione um estado</option>
                        {Object.keys(locationsData[formData.pais]).map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                        <option value="Outro">Outro</option>
                      </select>

                      {/* Campo manual se for "Outro" */}
                      {formData.estado === "Outro" && (
                        <input
                          type="text"
                          name="outraEstado"
                          value={formData.outraEstado}
                          onChange={handleChange}
                          placeholder="Digite seu estado"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    </div>
                  )}

                {/* Campo Cidade */}
                {formData.estado &&
                  formData.estado !== "Outro" &&
                  locationsData[formData.pais][formData.estado] && (
                    <div className="mb-4">
                      <label className="block font-medium mb-1 text-gray-700">Cidade</label>
                      <select
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Selecione uma cidade</option>
                        {locationsData[formData.pais][formData.estado].map((cidade) => (
                          <option key={cidade} value={cidade}>
                            {cidade}
                          </option>
                        ))}
                        <option value="Outro">Outro</option>
                      </select>

                      {/* Campo manual se for "Outro" */}
                      {formData.cidade === "Outro" && (
                        <input
                          type="text"
                          name="outraCidade"
                          value={formData.outraCidade}
                          onChange={handleChange}
                          placeholder="Digite sua cidade"
                          className="w-full p-2 border rounded mt-2"
                        />
                      )}
                    </div>
                  )}

            <label className="block font-bold mb-1 text-gray-700">
            Dados Pessoais
            </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="formacao"
              placeholder="Formação acadêmica"
              value={formData.formacao}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="experiencia"
              placeholder="Experiência profissional"
              value={formData.experiencia}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formData.github}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
              type="text"
              name="instagram"
              placeholder="Instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

            <label className="block font-bold mb-2 text-gray-700">
              Tecnologias de conhecimento
            </label>
          <div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tecnologiasList.map((tech) => (
                <label key={tech} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={tech}
                    checked={formData.tecnologias.includes(tech)}
                    onChange={handleChange}
                    className="rounded border"
                  />
                  <span>{tech}</span>
                </label>
              ))}

              {/* Campo "Outra tecnologia" */}
              <label className="flex items-center space-x-2 col-span-2 md:col-span-4">
                <input
                  type="checkbox"
                  value="Outra"
                  checked={!!formData.outraTecnologia}
                  onChange={(e) => {
                    if (!e.target.checked) setFormData({ ...formData, outraTecnologia: "" });
                  }}
                  className="rounded border"
                />
                <span>Outra:</span>
                <input
                  type="text"
                  placeholder="Especifique outra tecnologia (max 100 caracteres)"
                  maxLength={100}
                  value={formData.outraTecnologia}
                  onChange={(e) => setFormData({ ...formData, outraTecnologia: e.target.value })}
                  className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Botão salvar perfil */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold"
            >
              Salvar Perfil
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
