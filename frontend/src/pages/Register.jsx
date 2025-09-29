import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;

  const formatPhone = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 2) {
      return `(${onlyNumbers}`;
    } else if (onlyNumbers.length <= 7) {
      return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
    } else if (onlyNumbers.length <= 11) {
      return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(
        2,
        7
      )}-${onlyNumbers.slice(7)}`;
    } else {
      return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(
        2,
        7
      )}-${onlyNumbers.slice(7, 11)}`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !phone) {
      toast.error("Por favor, preencha todos os campos!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Número de telefone inválido. Use o formato (XX) 9XXXX-XXXX.");
      return;
    }

    if (!terms) {
      toast.error("Você deve concordar com os termos de uso.");
      return;
    }

    // cria um objeto padronizado para salvar
    const newUser = {
      name,
      email: email.toLowerCase(),
      phone,
      password,
      tecnologias: [],
    };

    // salva direto no localStorage primeiro
    localStorage.setItem("user", JSON.stringify(newUser));

    // autentica no contexto (pega exatamente o que foi salvo)
    login(newUser);

    toast.success("Conta criada com sucesso!");
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <div className="mb-6">
          <Logo />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Create an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-left">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left">E-mail Address</label>
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
              placeholder="********"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
              placeholder="********"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-left">Phone / WhatsApp</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-700"
              placeholder="(11) 91234-5678"
              maxLength="15"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mr-2"
              required
            />
            <span className="text-gray-600 text-sm">
              By continuing, you agree to our{" "}
              <a href="#" className="text-sky-700 underline">
                terms of service
              </a>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-sky-700 transition"
          >
            Sign up
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or sign up with</span>
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
          Already have an account?{" "}
          <Link to="/login" className="text-sky-700 underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
