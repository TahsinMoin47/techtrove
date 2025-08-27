// src/lib/api.js

// Read from env if present; fallback to local API.
// Put VITE_API_BASE=http://localhost:4000/api in web/.env.local
export const API_BASE =
  (import.meta?.env && import.meta.env.VITE_API_BASE) ||
  "http://localhost:4000/api";

// Generic response handler: gracefully handles JSON or plain text/HTML
async function handle(res) {
  const text = await res.text(); // read once
  if (!res.ok) {
    // Try structured error first
    try {
      const data = JSON.parse(text);
      throw new Error(data?.error || `HTTP ${res.status}`);
    } catch {
      // Fall back to raw text (helps when we accidentally hit index.html)
      throw new Error(text || `HTTP ${res.status}`);
    }
  }
  // Parse JSON if possible, else return raw text
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

// Utility: build query string from an object (skips empty values)
function qs(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") q.set(k, v);
  });
  return q.toString();
}

// ---------- Auth ----------
export async function apiLogin({ email, password }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handle(res); // -> { token, user }
}

// ---------- Listings ----------
export async function getFeatured() {
  const res = await fetch(`${API_BASE}/featured`);
  return handle(res);
}

export async function getListings(params = {}) {
  const res = await fetch(`${API_BASE}/listings?${qs(params)}`);
  return handle(res);
}

export async function getListingById(id) {
  const res = await fetch(`${API_BASE}/listings/${id}`);
  return handle(res);
}
