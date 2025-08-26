export default function Hero() {
    return (
      <section className="relative overflow-hidden rounded-3xl px-6 py-16 sm:py-20 bg-gradient-to-br from-indigo-600 via-fuchsia-500 to-cyan-500">
        {/* soft glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
  
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-4xl sm:text-5xl font-black leading-tight drop-shadow font-[Orbitron]">
            Where Tech Finds a New Home
          </h1>
          <p className="mt-4 text-white/90">
            The easiest way to explore, trade, and upgrade your tech.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-white/90">
              Shop Now
            </button>
            <button className="px-6 py-3 border border-white/70 text-white rounded-xl hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  }
  