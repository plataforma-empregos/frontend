import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Email para redefinição:", data.email);

    toast.success(
      "Se uma conta com este e-mail existir, um link de redefinição foi enviado."
    );

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="mb-6">
          <Logo />
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Esqueceu a senha?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Digite seu endereço de e-mail para receber o link de redefinição de
          senha.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1 text-left"
            >
              Endereço de E-mail
            </label>
            <input
              id="email"
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0069A8] bg-gray-50"
              placeholder="seu-email@exemplo.com"
              {...register("email", {
                required: "O e-mail é obrigatório.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Por favor, insira um e-mail válido.",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs text-left mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#0069A8] text-white p-2 rounded-lg font-semibold hover:bg-[#005080] transition"
          >
            Redefinir Senha
          </button>
        </form>

        <Link
          to="/login"
          className="block mx-auto mt-6 text-gray-500 font-semibold hover:underline text-center"
        >
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}
