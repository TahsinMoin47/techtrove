const CATEGORIES = [
    "All",
    "Phones",
    "Audio",
    "Wearables",
    "Cameras",
    "Accessories",
    "Laptops",
  ];
  
  export default function CategoryPills({ active, onChange }) {
    return (
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={
                "px-4 py-2 rounded-full text-sm border transition " +
                (isActive
                  ? "bg-indigo-600 text-white border-indigo-500 shadow"
                  : "bg-slate-800 text-white/80 border-white/10 hover:bg-slate-700 hover:text-white")
              }
            >
              {c}
            </button>
          );
        })}
      </div>
    );
  }
  