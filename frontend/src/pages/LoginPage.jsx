import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import { GoogleLogin } from "@react-oauth/google";

import api from "../services/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  // nova função 'login' do nosso AuthContext refatorado
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", data);

      // retornar os dados do usuário no corpo da resposta
      const userData = response.data.user; // ajustar o .user se o back retornar outro nome - eduardo)

      login(userData);

      toast.success("Bem-vindo(a) de volta!");
      navigate("/");
    } catch (error) {
      toast.error("Email ou senha inválidos.");
      console.error("Erro no login:", error);
    }
  };

  //Login do Google
  const handleGoogleSuccess = async (credentialResponse) => {
    // O 'credentialResponse' está armazenando o token JWT do Google
    const googleIdToken = credentialResponse.credential;

    try {
      const response = await api.post("/auth/google", {
        token: googleIdToken,
      });

      const userData = response.data.user;

      login(userData);

      toast.success(`Login com Google bem-sucedido!`);
      navigate("/");
    } catch (error) {
      console.error("Erro no fluxo de login com Google:", error);
      toast.error("Falha ao processar login com Google.");
    }
  };

  const handleGoogleError = () => {
    console.error("Falha no login com Google.");
    toast.error("Falha no login com o Google. Tente novamente.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--clr-bg-primary)] transition-colors duration-300">
      <div className="bg-[var(--clr-bg-secondary)] p-8 rounded-2xl shadow-lg w-96 text-center transition-colors duration-300">
        <div className="mb-6">
          <Logo />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Endereço de E-mail
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] placeholder-gray-400"
              placeholder="contact@email.com"
              {...register("email", {
                required: "O email é obrigatório.",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs text-left mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 pr-10 bg-[var(--clr-bg-primary)] text-[var(--clr-text-primary)] placeholder-gray-400"
                placeholder="********"
                {...register("password", {
                  required: "A senha é obrigatória.",
                  minLength: { value: 8, message: "Mínimo 8 caracteres." },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sky-700 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              ></button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs text-left mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to="/forgot-password"
              className="mx-auto text-xs text-sky-700 hover:underline"
            >
              Esqueceu a senha?
            </Link>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" {...register("terms")} />
              <span className="text-[var(--clr-text-primary)] text-sm">
                Mantenha-me conectado
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-700 text-white p-2 rounded-lg hover:bg-sky-800 transition disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          <span className="px-2 text-gray-500 dark:text-gray-400 text-sm">
            Ou entre com
          </span>
          <hr className="flex-grow border-gray-300 dark:border-gray-600" />
        </div>

        <div className="w-full flex justify-center">
          {isSubmitting ? (
            <div className="text-gray-500 dark:text-gray-400 py-2">
              Processando...
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap
            />
          )}
        </div>

        <p className="text-center text-sm text-[var(--clr-text-primary)] mt-4">
          <Link to="/register" className="text-sky-700 underline">
            Crie uma conta
          </Link>
        </p>
      </div>
    </div>
  );
}
