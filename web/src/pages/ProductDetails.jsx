import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { getListingById } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListingById(id)
      .then(setItem)
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading…</div>;
  if (!item) {
    return (
      <div className="space-y-4">
        <p className="text-red-300">Product not found.</p>
        <Link to="/products" className="underline">Back to products</Link>
      </div>
    );
  }

  const ownerName = item.owner_name || "Seller";
  const ownerEmail = item.owner_email || "seller@techtrove.test";
  const ownerPhone = item.owner_phone || "+8801700000000";

  const mailSubject = encodeURIComponent(`Inquiry about ${item.title}`);
  const mailBody = encodeURIComponent(
    `Hi ${ownerName},\n\nI'm interested in your "${item.title}". Is it still available?\n\nThanks!`
  );
  const mailto = `mailto:${ownerEmail}?subject=${mailSubject}&body=${mailBody}`;
  const waText = encodeURIComponent(
    `Hello ${ownerName}, I'm interested in "${item.title}". Is it available?`
  );
  const whatsapp = `https://wa.me/${ownerPhone.replace(/[^\d]/g, "")}?text=${waText}`;

  const requireLogin = (action) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    window.location.href = action;
  };

  const heroImage = item.images?.[0]?.image_url;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl p-3">
        {heroImage ? (
          <img
            src={heroImage}
            alt={item.title}
            className="rounded-xl w-full h-[380px] object-cover"
          />
        ) : (
          <div className="rounded-xl w-full h-[380px] grid place-items-center text-black/60">
            No image
          </div>
        )}
      </div>

      <div>
        <nav className="text-sm text-white/60 mb-3">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to="/products" className="hover:underline ml-1">Products</Link> /
          <span className="ml-1 text-white">{item.title}</span>
        </nav>

        <h1 className="text-3xl font-bold">{item.title}</h1>
        <p className="mt-3 text-gray-300">{item.description}</p>

        <div className="mt-4 text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
          ৳{Number(item.price).toLocaleString("en-BD")}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => requireLogin(mailto)}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700"
          >
            Contact Owner
          </button>
          <button
            onClick={() => requireLogin(`tel:${ownerPhone}`)}
            className="px-5 py-3 rounded-xl border border-white/20 hover:bg-white/10"
          >
            Call Owner
          </button>
          <button
            onClick={() => requireLogin(whatsapp)}
            className="px-5 py-3 rounded-xl border border-green-400/40 text-green-300 hover:bg-green-400/10"
          >
            WhatsApp
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 p-4">
          <div className="text-sm text-white/70">Seller</div>
          <div className="font-semibold">{ownerName}</div>
          <div className="mt-1 text-sm text-white/60">
            Email: {ownerEmail} • Phone: {ownerPhone}
          </div>
        </div>
      </div>
    </div>
  );
}
