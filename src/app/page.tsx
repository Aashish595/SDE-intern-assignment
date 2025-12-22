"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Services from "@/components/home/Services";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  checkAuth();
}, []);

const checkAuth = async () => {
  try {
    const res = await api("/api/auth/me");
    setIsLoggedIn(!!res.user);
  } finally {
    setIsLoading(false);
  }
};


  if (isLoading) {
    return (
      <main className="flex justify-center items-center min-h-screen">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section id="home" className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af33,transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <span className="inline-block mb-4 px-4 py-1 rounded-full border border-slate-700 text-sm text-slate-400">
            Cybersecurity as a Service
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Protect Your{" "}
            <span className="text-indigo-500">Digital Assets</span>
            <br />
            With Confidence
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
            ApniSec delivers proactive cybersecurity solutions to help organizations
            detect, manage, and mitigate risks before attackers do.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {isLoggedIn ? (
              // User is logged in - show dashboard button
              <Link
                href="/dashboard"
                className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              // User is not logged in - show register/login buttons
              <>
                <Link
                  href="/register"
                  className="px-8 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
                >
                  Get Started
                </Link>

                <Link
                  href="/login"
                  className="px-8 py-3 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-900 transition"
                >
                  Access Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - IMPORTED COMPONENT */}
      <Services />

      {/* WHY APNISEC */}
      <section id="why-apnisec" className="bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">
            Why Organizations Choose ApniSec
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Centralized Visibility",
                desc: "All security findings in one unified dashboard.",
              },
              {
                title: "Real-time Alerts",
                desc: "Immediate notifications for critical security risks.",
              },
              {
                title: "Role-based Access",
                desc: "Granular access control for teams and stakeholders.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-xl p-8"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative py-28">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 to-cyan-500/10" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold">
            Ready to Strengthen Your Security?
          </h2>
          <p className="mt-4 text-slate-400">
            Start securing your organization with ApniSec today.
          </p>

          <div className="mt-8">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-block px-10 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                href="/contact"
                className="inline-block px-10 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
              >
                Talk to Security Experts
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}