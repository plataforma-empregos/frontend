import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import TermsModal from "../components/TermsModal";
import Logo from "../components/Logo";

import api from "../services/api";

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    watch,
  } = useForm({ mode: "onBlur" });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const userData = response.data.user;

      login(userData);

      toast.success("Conta criada com sucesso!");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao criar a conta. Tente novamente.");
      }
      console.error("Erro no registro:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--clr-bg-secondary)] transition-colors duration-300">
      <div className="bg-[var(--clr-bg-primary)] p-8 rounded-2xl shadow-lg w-96 transition-colors duration-300">
        <h1 className="text-4xl font-bold text-center text-sky-700 dark:text-sky-400 mb-4">
          <Logo />
        </h1>
        <h2 className="text-lg font-semibold text-center mb-4 text-[var(--clr-text-primary)]">
          Criar uma nova conta
        </h2>
      
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Nome
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded-lg bg-[var(--clr-bg-secondary)] text-[var(--clr-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="Insira seu nome completo"
              {...register("name", { required: "O nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
       
          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Endereço de E-mail
            </label>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded-lg bg-[var(--clr-bg-secondary)] text-[var(--clr-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="contato@email.com"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Formato de email inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Senha
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg bg-[var(--clr-bg-secondary)] text-[var(--clr-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="********"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter no mínimo 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[var(--clr-text-primary)] text-left">
              Confirme Senha
            </label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-lg bg-[var(--clr-bg-secondary)] text-[var(--clr-text-primary)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
              placeholder="********"
              {...register("confirmPassword", {
                required: "A confirmação da senha é obrigatória",
                validate: (value) =>
                  value === password || "As senhas não coincidem",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

        
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="mt-1 mr-2 h-4 w-4 accent-sky-600 dark:accent-sky-500"
              {...register("terms", {
                required: "Você deve aceitar os termos de serviço.",
              })}
            />
            <label
              htmlFor="terms"
              className="text-[var(--clr-text-primary)] text-sm text-left"
            >
              Ao continuar, você concorda com os nossos{" "}
              <button
                type="button"
                onClick={openModal}
                className="text-sky-700 dark:text-sky-400 underline hover:text-sky-800 dark:hover:text-sky-300 font-semibold bg-transparent border-none p-0"
              >
                termos de serviço
              </button>
              .
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs text-left">
              {errors.terms.message}
            </p>
          )}

       
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0069A8] dark:bg-sky-600 text-white p-2 rounded-lg hover:bg-[#005080] dark:hover:bg-sky-500 transition disabled:opacity-50"
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar-se"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--clr-text-primary)] mt-4">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="text-sky-700 dark:text-sky-400 underline hover:text-sky-800 dark:hover:text-sky-300"
          >
            Entre aqui
          </Link>
        </p>
      </div>

      <TermsModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}
