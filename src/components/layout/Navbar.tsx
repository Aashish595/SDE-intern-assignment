"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface User {
  name?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Fetch current user
const checkAuth = async (): Promise<void> => {
  setIsLoading(true);
  try {
    const res = await fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();
    setUser(data.user ?? null);
  } catch {
    setUser(null);
  } finally {
    setIsLoading(false);
  }
};



useEffect(() => {
  checkAuth();
}, [pathname]);


  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    router.refresh();
    router.push("/");
  };

  // Scroll or navigate
  const handleNavigation = (sectionId: string) => {
    if (isHomePage) {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-500">Apni</span>
            <span className="text-2xl font-bold text-slate-200">Sec</span>
          </div>
          <div className="h-8 w-20 bg-slate-800 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <span className="text-2xl font-bold text-indigo-500">Apni</span>
          <span className="text-2xl font-bold text-slate-200">Sec</span>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-slate-300 text-sm font-medium">
          <button
            onClick={() => handleNavigation("services")}
            className="hover:text-indigo-400 transition hover:scale-105"
          >
            Services
          </button>
          <button
            onClick={() => handleNavigation("why-apnisec")}
            className="hover:text-indigo-400 transition hover:scale-105"
          >
            Why ApniSec
          </button>
          <Link href="/dashboard" className="hover:text-indigo-400 transition hover:scale-105">
            Dashboard
          </Link>
          <button
            onClick={() => handleNavigation("cta")}
            className="hover:text-indigo-400 transition hover:scale-105"
          >
            Contact
          </button>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-slate-300 hover:text-white transition hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition hover:scale-105"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/profile"
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500 transition hover:scale-105"
              >
                {user.name ?? "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
