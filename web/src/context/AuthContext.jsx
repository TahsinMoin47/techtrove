import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiLogin } from "../lib/api"; // <-- uses your /api/login endpoint

const AuthContext = createContext(null);
const STORAGE_KEY = "tt_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email, token }

  // Load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  // Real login against your backend DB (bcrypt-checked)
  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required.");
    const { token, user: u } = await apiLogin({ email, password }); // { token, user: { id, name, email } }
    setUser({ ...u, token });
  };

  // Clear session
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: !!user }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
