export default function Footer() {
    return (
      <footer className="mt-16 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} TechTrove. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-indigo-300">Privacy</a>
            <a href="#" className="hover:text-indigo-300">Terms</a>
            <a href="#" className="hover:text-indigo-300">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  