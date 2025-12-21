import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative">
        {/* subtle cyber glow */}
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
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-center">
          Security Services We Offer
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Cloud Security",
              desc: "Protect cloud infrastructure from misconfigurations and threats.",
            },
            {
              title: "Red Team Assessment",
              desc: "Simulated attacks to test real-world detection and response.",
            },
            {
              title: "VAPT",
              desc: "Identify and remediate vulnerabilities proactively.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-8 hover:border-indigo-500 transition"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY APNISEC */}
      <section className="bg-slate-950 py-24">
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
      <section className="relative py-28">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600/10 to-cyan-500/10" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold">
            Ready to Strengthen Your Security?
          </h2>
          <p className="mt-4 text-slate-400">
            Start securing your organization with ApniSec today.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 px-10 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Talk to Security Experts
          </Link>
        </div>
      </section>
    </main>
  );
}
