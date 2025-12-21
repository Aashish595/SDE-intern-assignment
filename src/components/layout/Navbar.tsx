import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-500">Apni</span>
          <span className="text-2xl font-bold text-slate-200">Sec</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
          <a href="#services" className="hover:text-indigo-400 transition">
            Services
          </a>
          <a href="#features" className="hover:text-indigo-400 transition">
            Features
          </a>
          <Link href="/dashboard" className="hover:text-indigo-400 transition">
            Dashboard
          </Link>
          <a href="#contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-300 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
