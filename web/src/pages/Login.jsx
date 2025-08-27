import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const redirectTo = state?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-pink-500 min-h-screen flex flex-col justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Welcome to TechTrove
        </h1>

        {err && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-3 py-2 text-sm">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-black font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-black font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
