export default function CTABanner() {
    return (
      <section className="relative overflow-hidden rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Sign up for early deals & drops
            </h3>
            <p className="text-white/90 mt-1">
              Be the first to know about new arrivals and special offers.
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-white/90">
            Join Newsletter
          </button>
        </div>
      </section>
    );
  }
  