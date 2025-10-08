import { useState, useEffect } from "react";
import { locationsData } from "../data/locationsData";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    phone: "",
    sobre: "",
    pais: "",
    estado: "",
    cidade: "",
    formacao: "",
    experiencia: "",
    linkedin: "",
    github: "",
    instagram: "",
    tecnologias: [],
    outraTecnologia: "",
    foto: null,
    curriculo: null, // ✅ novo campo para o currículo
  });

  const tecnologiasList = [
    "React", "Angular", "Vue.js", "C#", "PHP", "Java", "JavaScript", "TypeScript",
    "R", "Kotlin", "Swift", "Flutter", "SQL", "Power BI", "Unity", "Unreal Engine",
    "Docker", "Kubernetes", "Git", "Linux", "MacOS", "Windows", "Pacote Office",
    "Photoshop", "Illustrator", "InDesign", "CorelDraw", "Canva", "Figma"
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // ✅ Corrige para manter valores padrão e evita erro com URL temporária do currículo
      if (parsedData.curriculo && parsedData.curriculo.name) {
        parsedData.curriculo.url = null;
      }

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

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    // Tratamento de upload da foto
    if (name === "foto") {
      const file = files[0];
      if (file && file.size <= 2 * 1024 * 1024) {
        setFormData({ ...formData, foto: URL.createObjectURL(file) });
      } else {
        alert("Arquivo inválido ou maior que 2MB");
      }
      return;
    }

    // ✅ Novo: Tratamento de upload do currículo
    if (name === "curriculo") {
      const file = files[0];
      if (
        file &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      ) {
        if (file.size <= 5 * 1024 * 1024) {
          const fileURL = URL.createObjectURL(file);
          setFormData({
            ...formData,
            curriculo: { name: file.name, url: fileURL },
          });
        } else {
          alert("O arquivo deve ter no máximo 5MB.");
        }
      } else {
        alert("Apenas arquivos PDF, DOC ou DOCX são permitidos.");
      }
      return;
    }

    // Checkbox de tecnologias
    if (type === "checkbox") {
      let updatedTecnologias = [...formData.tecnologias];
      if (checked) updatedTecnologias.push(value);
      else updatedTecnologias = updatedTecnologias.filter((t) => t !== value);
      setFormData({ ...formData, tecnologias: updatedTecnologias });
      return;
    }

    // País, estado e cidade
    if (name === "pais") {
      setFormData({ ...formData, pais: value, estado: "", cidade: "" });
    } else if (name === "estado") {
      setFormData({ ...formData, estado: value, cidade: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formData,
      email: user?.email || formData.email,
    };

    // ✅ remove URL temporária do currículo antes de salvar no localStorage
    if (formData.curriculo && formData.curriculo.name) {
      dataToSave.curriculo = { name: formData.curriculo.name };
    }

    localStorage.setItem("userProfile", JSON.stringify(dataToSave));
    alert("Perfil salvo com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
            Meu Perfil
          </h1>

          <div className="flex flex-col items-center">
            {formData.foto ? (
              <img
                src={formData.foto}
                alt="Foto do perfil"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-700"
              />
            ) : (
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
          <label className="block font-bold mb-1 text-gray-700">Contato</label>

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
              readOnly
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

          <div className="mb-4">
            <label className="block font-medium mb-1 text-gray-700">País</label>
            <select
              name="pais"
              value={formData.pais}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Selecione um país</option>
              {Object.keys(locationsData)
                .sort()
                .map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
              <option value="Outro">Outro</option>
            </select>

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

          {formData.pais &&
            formData.pais !== "Outro" &&
            locationsData[formData.pais] && (
              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700">
                  Estado
                </label>
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

          {formData.estado &&
            formData.estado !== "Outro" &&
            locationsData[formData.pais][formData.estado] && (
              <div className="mb-4">
                <label className="block font-medium mb-1 text-gray-700">
                  Cidade
                </label>
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

              <label className="flex items-center space-x-2 col-span-2 md:col-span-4">
                <input
                  type="checkbox"
                  value="Outra"
                  checked={!!formData.outraTecnologia}
                  onChange={(e) => {
                    if (!e.target.checked)
                      setFormData({ ...formData, outraTecnologia: "" });
                  }}
                  className="rounded border"
                />
                <span>Outra:</span>
                <input
                  type="text"
                  placeholder="Especifique outra tecnologia (max 100 caracteres)"
                  maxLength={100}
                  value={formData.outraTecnologia}
                  onChange={(e) =>
                    setFormData({ ...formData, outraTecnologia: e.target.value })
                  }
                  className="border p-2 rounded flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </label>
            </div>
          </div>

          {/* Upload do currículo */}
          <div className="mt-6 mb-8">
            <label className="block font-bold mb-2 text-gray-700">
              Anexar Currículo (PDF, DOC ou DOCX)
            </label>
            <input
              type="file"
              name="curriculo"
              accept=".pdf, .doc, .docx"
              onChange={handleChange}
              className="text-sm text-gray-600 border p-2 rounded-lg"
            />
            {formData.curriculo && (
              <div className="mt-2 flex items-center space-x-3">
                <span className="text-gray-700 text-sm">
                  Arquivo: <strong>{formData.curriculo.name}</strong>
                </span>
                {formData.curriculo.url && (
                  <a
                    href={formData.curriculo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline text-sm"
                  >
                    Visualizar
                  </a>
                )}
              </div>
            )}
          </div>

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
