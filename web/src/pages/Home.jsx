import { useEffect, useMemo, useState } from "react";
import Hero from "../components/Hero";
import CategoryPills from "../components/CategoryPills";
import GadgetCard from "../components/GadgetCard";
import CTABanner from "../components/CTABanner";
import { getFeatured } from "../lib/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("relevance");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeatured()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = items.filter((g) => {
      const inCat = category === "All" || String(g.category_id) === category || false;
      const inQuery =
        g.title.toLowerCase().includes(q) ||
        (g.description || "").toLowerCase().includes(q);
      return inCat && inQuery;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [items, query, category, sort]);

  return (
    <div className="space-y-12">
      <Hero />

      <section className="max-w-6xl mx-auto px-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CategoryPills active={category} onChange={setCategory} />
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search featured gadgets..."
                className="w-full md:w-80 rounded-xl border border-gray-300 bg-white text-black px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white text-black px-3 py-2"
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-8 text-white/70">Loading…</div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((g) => (
                <GadgetCard
                  key={g.id}
                  id={g.id}
                  image={g.image}
                  name={g.title}
                  price={Number(g.price)}
                  description={g.description}
                  badge={g.item_condition}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-16 text-center text-gray-300">
                No gadgets found. Try another search or category.
              </div>
            )}
          </>
        )}
      </section>

      <section className="max-w-6xl mx-auto">
        <CTABanner />
      </section>
    </div>
  );
}
