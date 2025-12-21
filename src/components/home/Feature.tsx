const services = [
  "Cloud Security",
  "Red Team Assessment",
  "VAPT Services",
];

export default function Features() {
  return (
    <section id="features" className="py-16 px-8 bg-slate-100">
      <h2 className="text-2xl font-bold text-center mb-10">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {services.map((s) => (
          <div key={s} className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-indigo-600">{s}</h3>
            <p className="text-sm text-slate-500 mt-2">
              Professional security assessment and protection.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
