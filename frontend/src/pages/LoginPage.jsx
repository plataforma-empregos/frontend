import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";
import { GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const mockUserData = { name: "Usuário", email: data.email };
      login(mockUserData);
      toast.success("Bem-vindo(a) de volta!");
      navigate("/");
    } catch (error) {
      toast.error("Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    const googleIdToken = credentialResponse.credential;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      function decodeJwt(token) {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      }

      const decodedToken = decodeJwt(googleIdToken);

      const userName =
        decodedToken?.given_name || decodedToken?.name || "Usuário Google";

      const mockUserDataFromBackend = {
        name: userName,
        email: decodedToken?.email || "email.google@exemplo.com",
      };

      login(mockUserDataFromBackend);
      toast.success(`Login com Google bem-sucedido, ${userName}!`);
      navigate("/");
    } catch (error) {
      console.error("Erro no fluxo de login com Google:", error);
      toast.error("Falha ao processar login com Google.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Falha no login com Google.");
    toast.error("Falha no login com o Google. Tente novamente.");
    setIsLoading(false);
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
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-1.79.22l.45.45A6 6 0 0 1 8 3.5c2.12 0 3.88.938 5.04 2.36.187.22.362.448.526.68l.452.45c.002.003.003.006.005.01l-.001-.004zm-1.89-1.89a4 4 0 0 1-5.184-5.184l8.068 8.068a4 4 0 0 1-2.884-2.884zM10.878 10.878l-8.068-8.068a7 7 0 0 0-.22 1.79C2.5 4.5 0 8 0 8s3 5.5 8 5.5c.71 0 1.39-.107 2.02-.3l-.451-.45a6 6 0 0 1-6.17-1.07l-.45-.45a4 4 0 0 1 2.885-2.884l.452.45-.005-.01.001.004zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                )}
              </button>
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
            disabled={isLoading}
            className="w-full bg-sky-700 text-white p-2 rounded-lg hover:bg-sky-800 transition disabled:opacity-50"
          >
            {isLoading ? "Entrando..." : "Login"}
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
          {isLoading ? (
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
