export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-950 mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h3 className="text-xl font-bold text-indigo-500">
            Apni<span className="text-slate-200">Sec</span>
          </h3>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            ApniSec is a cybersecurity platform helping organizations identify,
            manage, and remediate security risks with confidence.
          </p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Platform
          </h4>
          <ul className="mt-4 space-y-2 text-slate-400 text-sm">
            <li>Dashboard</li>
            <li>Issues</li>
            <li>Reports</li>
            <li>Integrations</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Services
          </h4>
          <ul className="mt-4 space-y-2 text-slate-400 text-sm">
            <li>Cloud Security</li>
            <li>Red Team Assessment</li>
            <li>VAPT</li>
            <li>Compliance</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Contact
          </h4>
          <p className="mt-4 text-slate-400 text-sm">
            support@apnisec.com
          </p>
          <p className="text-slate-400 text-sm">India</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ApniSec. All rights reserved.
      </div>
    </footer>
  );
}
