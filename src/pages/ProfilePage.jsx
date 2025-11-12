import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { locationsData } from "../data/locationsData";
import { toast } from "react-hot-toast";

export default function Profile() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: "",
      email: "",
      phone: "",
      sobre: "",
      pais: "",
      estado: "",
      cidade: "",
      formacao: [{ value: "" }],
      experiencia: [{ value: "" }],
      linkedin: "",
      github: "",
      instagram: "",
      tecnologias: [],
      foto: null,
    },
  });

  const {
    fields: formacaoFields,
    append: appendFormacao,
    remove: removeFormacao,
  } = useFieldArray({ control, name: "formacao" });

  const {
    fields: experienciaFields,
    append: appendExperiencia,
    remove: removeExperiencia,
  } = useFieldArray({ control, name: "experiencia" });

  const tecnologiasList = [
    "React",
    "Angular",
    "Vue.js",
    "C#",
    "PHP",
    "Java",
    "JavaScript",
    "TypeScript",
    "R",
    "Kotlin",
    "Swift",
    "Flutter",
    "SQL",
    "Power BI",
    "Unity",
    "Unreal Engine",
    "Docker",
    "Kubernetes",
    "Git",
    "Linux",
    "MacOS",
    "Windows",
    "Pacote Office",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "CorelDraw",
    "Canva",
    "Figma",
  ];

  const paisSelecionado = watch("pais");
  const estadoSelecionado = watch("estado");
  const fotoPreview = watch("foto");

  useEffect(() => {
    const savedData = localStorage.getItem("userProfile");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData.formacao = parsedData.formacao || [{ value: "" }];
      parsedData.experiencia = parsedData.experiencia || [{ value: "" }];
      reset(parsedData);
    }
  }, [reset]);

  const onSubmit = (data) => {
    const dataToSave = { ...data };
    if (data.foto && data.foto[0] instanceof File) {
      dataToSave.foto = URL.createObjectURL(data.foto[0]);
    }
    localStorage.setItem("userProfile", JSON.stringify(dataToSave));
    toast.success("Perfil salvo com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] font-sans p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-[var(--clr-bg-secondary)] shadow-lg rounded-xl p-6 md:p-10 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Meu Perfil
          </h1>
          <div className="flex flex-col items-center">
            <img
              src={
                fotoPreview && fotoPreview[0] instanceof File
                  ? URL.createObjectURL(fotoPreview[0])
                  : typeof fotoPreview === "string"
                  ? fotoPreview
                  : "https://via.placeholder.com/128"
              }
              alt="Foto do perfil"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-700"
            />
            <input
              type="file"
              name="foto"
              accept="image/*"
              className="mt-2 text-sm opacity-80 hover:opacity-100 transition"
              {...register("foto")}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contato */}
          <label className="block font-bold mb-1">Contato</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("nome", { required: "Nome é obrigatório" })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email inválido",
                },
              })}
            />
            <input
              type="text"
              placeholder="Telefone"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("phone")}
            />
          </div>

          {errors.nome && (
            <p className="text-red-500 text-xs">{errors.nome.message}</p>
          )}
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          {/* Sobre */}
          <div>
            <label className="block font-bold mb-1">
              Fale sobre você (max 300 caracteres)
            </label>
            <textarea
              maxLength={300}
              className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("sobre")}
            />
          </div>

          {/* Localização */}
          <label className="block font-bold mb-1">Localização</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="w-full p-3 border rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("pais")}
            >
              <option value="">Selecione um país</option>
              {Object.keys(locationsData)
                .sort()
                .map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
            </select>

            {paisSelecionado && locationsData[paisSelecionado] && (
              <select
                className="w-full p-3 border rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
                {...register("estado")}
              >
                <option value="">Selecione um estado</option>
                {Object.keys(locationsData[paisSelecionado]).map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            )}

            {estadoSelecionado &&
              locationsData[paisSelecionado]?.[estadoSelecionado] && (
                <select
                  className="w-full p-3 border rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
                  {...register("cidade")}
                >
                  <option value="">Selecione uma cidade</option>
                  {locationsData[paisSelecionado][estadoSelecionado].map(
                    (cidade) => (
                      <option key={cidade} value={cidade}>
                        {cidade}
                      </option>
                    )
                  )}
                </select>
              )}
          </div>

          {/* Formação */}
          <label className="block font-bold mb-1">Dados Profissionais</label>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Formação Acadêmica
            </label>
            {formacaoFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mb-2">
                <input
                  placeholder="Ex: Bacharelado em Ciência da Computação - USP (2020)"
                  className="border p-3 rounded-lg flex-grow focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
                  {...register(`formacao.${index}.value`, {
                    required: "Este campo é obrigatório",
                  })}
                />
                {formacaoFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFormacao(index)}
                    className="bg-red-600 text-white hover:bg-red-700 transition font-semibold text-sm px-3 py-2 rounded-lg"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendFormacao({ value: "" })}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold text-sm mt-2"
            >
              + Adicionar Formação
            </button>
          </div>

          {/* Experiência */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Experiência Profissional
            </label>
            {experienciaFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 mb-2">
                <input
                  placeholder="Ex: Desenvolvedor Full Stack - Google (2021-Presente)"
                  className="border p-3 rounded-lg flex-grow focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
                  {...register(`experiencia.${index}.value`, {
                    required: "Este campo é obrigatório",
                  })}
                />
                {experienciaFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperiencia(index)}
                    className="bg-red-600 text-white hover:bg-red-700 transition font-semibold text-sm px-3 py-2 rounded-lg"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendExperiencia({ value: "" })}
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-semibold text-sm mt-2"
            >
              + Adicionar Experiência
            </button>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="LinkedIn"
              className="border p-3 rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("linkedin")}
            />
            <input
              type="text"
              placeholder="GitHub"
              className="border p-3 rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("github")}
            />
            <input
              type="text"
              placeholder="Instagram"
              className="border p-3 rounded-lg bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)]"
              {...register("instagram")}
            />
          </div>

          {/* Tecnologias */}
          <label className="block font-bold mb-2">Tecnologias</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {tecnologiasList.map((tech) => (
              <label key={tech} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={tech}
                  className="rounded border accent-blue-700"
                  {...register("tecnologias")}
                />
                <span>{tech}</span>
              </label>
            ))}
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
