import { useEffect, useMemo, useState } from "react";
import GadgetCard from "../components/GadgetCard";
import CategoryPills from "../components/CategoryPills";
import { getListings } from "../lib/api";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [sort, setSort] = useState("relevance");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = {
        search: query,
        sort: sort.replace("-", "_"), // price-asc → price_asc
      };
      if (category !== "All") params.categoryId = category;
      if (min) params.min = min;
      if (max) params.max = max;

      const data = await getListings(params);
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]); // load once, and re-load when sort changes

  const onFilterSubmit = (e) => {
    e.preventDefault();
    load();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">All Products</h1>

      <form
        onSubmit={onFilterSubmit}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <CategoryPills active={category} onChange={setCategory} />

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="rounded-xl border border-gray-300 bg-white text-black px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
          />
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Min ৳"
            className="w-28 rounded-xl border border-gray-300 bg-white text-black px-3 py-2"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Max ৳"
            className="w-28 rounded-xl border border-gray-300 bg-white text-black px-3 py-2"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white text-black px-3 py-2"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
          >
            Apply
          </button>
        </div>
      </form>

      {loading ? (
        <p className="text-white/70">Loading…</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((g) => (
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
          {items.length === 0 && (
            <p className="text-white/70">No products match your filters.</p>
          )}
        </>
      )}
    </div>
  );
}
