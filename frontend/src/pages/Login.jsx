import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!terms) {
      toast.error("Você deve concordar com os termos de uso.");
      return;
    }

    // recupera o usuário salvo no Register
    const savedUser = JSON.parse(localStorage.getItem("user"));

    console.log("DEBUG user no localStorage:", savedUser);


    if (!savedUser) {
      toast.error("Nenhum usuário encontrado. Crie uma conta primeiro.");
      return;
    }

    // validação: email normalizado + senha exata
    if (
      savedUser.email.toLowerCase() === email.toLowerCase() &&
      savedUser.password === password
    ) {
      login(savedUser); // autentica no contexto
      toast.success("Login realizado com sucesso!");
      navigate("/profile");
    } else {
      toast.error("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="mb-6">
          <Logo />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-left">
              E-mail Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
              placeholder="contact@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700 pr-10"
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#0069A8] p-1 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#0069A8"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path d="M12 4.5C7.305 4.5 3.135 7.364 1.5 12c1.635 4.636 5.805 7.5 10.5 7.5s8.865-2.864 10.5-7.5C20.865 7.364 16.695 4.5 12 4.5zm0 13c-3.59 0-6.79-2.13-8.19-5.5C5.21 8.13 8.41 6 12 6s6.79 2.13 8.19 5.5c-1.4 3.37-4.6 5.5-8.19 5.5zm0-9A3.5 3.5 0 1 0 12 16a3.5 3.5 0 0 0 0-7zm0 5A1.5 1.5 0 1 1 12 9a1.5 1.5 0 0 1 0 3z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="#0069A8"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                  >
                    <path d="M1.5 12C3.135 7.364 7.305 4.5 12 4.5s8.865-2.864 10.5 7.5c-1.635 4.636-5.805 7.5-10.5 7.5S3.135 16.636 1.5 12z" />
                    <circle cx="12" cy="12" r="3.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/forgot-password"
              className="mx-auto text-xs text-[#0069A8] hover:underline focus:outline-none"
            >
              Forgot Password?
            </Link>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mr-2"
                required
              />
              <span className="text-gray-600 text-sm">Keep me signed in</span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0069A8] text-white p-2 rounded-lg hover:bg-[#005080] transition"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">Or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full flex items-center justify-center border rounded-lg p-2 hover:bg-gray-200 transition">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          <Link to="/register" className="text-sky-700 underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
