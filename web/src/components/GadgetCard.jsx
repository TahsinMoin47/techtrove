export default function GadgetCard({ image, name, price, description, badge }) {
  return (
    <div className="group border rounded-2xl p-4 shadow-sm hover:shadow-lg transition bg-white">
      <div className="relative">
        {badge && (
          <span className="absolute left-3 top-3 text-xs font-semibold px-2 py-1 rounded-full bg-indigo-600 text-white">
            {badge}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="rounded-xl w-full h-44 object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
          ৳{price.toLocaleString("en-BD")}
        </span>
        <button className="px-3 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
          View Details
        </button>
      </div>
    </div>
  );
}
