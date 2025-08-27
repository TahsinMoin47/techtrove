import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a192f]/95 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
            TechTrove
          </span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/" className="hover:text-indigo-300">Home</Link>
          <Link to="/products" className="hover:text-indigo-300">Products</Link>
          <Link to="/about" className="hover:text-indigo-300">About</Link>

          {!user ? (
            <Link
              to="/login"
              className="ml-2 rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-white/80 hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-white/10 px-3 py-1.5 hover:bg-white/15"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
