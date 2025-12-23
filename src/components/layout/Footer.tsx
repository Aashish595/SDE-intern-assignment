export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-950 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight">
            <span className="text-indigo-500">Apni</span>
            <span className="text-slate-200">Sec</span>
          </h3>
          <p className="mt-5 text-slate-400 text-sm leading-relaxed max-w-sm">
            ApniSec helps organizations identify, manage, and remediate
            cybersecurity risks with enterprise-grade solutions.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Platform
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {["Dashboard", "Issues", "Reports", "Integrations"].map((item) => (
              <li
                key={item}
                className="text-slate-400 hover:text-indigo-400 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Services
          </h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              "Cloud Security",
              "Red Team Assessment",
              "VAPT",
              "Compliance & Governance",
            ].map((service) => (
              <li
                key={service}
                className="text-slate-400 hover:text-indigo-400 transition cursor-pointer"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
            Contact
          </h4>

          <div className="mt-5 space-y-3 text-sm">
            <p className="text-slate-400 hover:text-indigo-400 transition cursor-pointer">
              support@apnisec.com
            </p>
            <p className="text-slate-400">India</p>
          </div>

          {/* Social icons placeholder */}
          <div className="flex gap-4 mt-6">
            {["🌐", "💼", "🐦"].map((icon, index) => (
              <span
                key={index}
                className="text-xl cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition"
              >
                {icon}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} ApniSec. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
