import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("If this email exists, a reset link will be sent.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-4xl font-bold text-center text-sky-700 mb-4">
          TrampoMATCH
        </h1>
        <h2 className="text-2xl font-bold text-center mb-2">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter your email address to get the password reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1 text-left"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0069A8] bg-gray-50"
              placeholder="hello@example.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2CA19B] text-white p-2 rounded-lg font-semibold hover:bg-[#23867f] transition"
          >
            Password Reset
          </button>
        </form>
        <Link
          to="/"
          className="block mx-auto mt-6 text-gray-500 font-semibold hover:underline text-center"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
