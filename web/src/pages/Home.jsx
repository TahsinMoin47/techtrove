import { useMemo, useState } from "react";
import Hero from "../components/Hero";
import CategoryPills from "../components/CategoryPills";
import GadgetCard from "../components/GadgetCard";
import CTABanner from "../components/CTABanner";
import { featuredGadgets } from "../data/featured";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return featuredGadgets.filter((g) => {
      const inCategory = category === "All" || g.category === category;
      const inQuery =
        g.name.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  return (
    <div className="space-y-12">
      {/* Vibrant Hero */}
      <Hero />

      {/* Categories + Search */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CategoryPills active={category} onChange={setCategory} />
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search featured gadgets..."
              className="w-full md:w-80 rounded-xl border border-gray-300 bg-white px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
          </div>
        </div>

        {/* Featured Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((g) => (
            <GadgetCard
              key={g.id}
              image={g.image}
              name={g.name}
              price={g.price}
              description={g.description}
              badge={g.badge}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-16 text-center text-gray-500">
            No gadgets found. Try another search or category.
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <CTABanner />
      </section>
    </div>
  );
}
