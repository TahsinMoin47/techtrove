const CATEGORIES = [
    "All",
    "Phones",
    "Audio",
    "Wearables",
    "Cameras",
    "Accessories",
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
                "px-4 py-2 rounded-full text-sm border " +
                (isActive
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300")
              }
            >
              {c}
            </button>
          );
        })}
      </div>
    );
  }
  