"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Cloud Security",
    description:
      "Protect cloud infrastructure from misconfigurations and threats with continuous monitoring and compliance checks.",
    icon: "☁️",
    features: [
      "AWS/Azure/GCP Security",
      "Cloud Compliance",
      "Container Security",
      "Serverless Protection",
    ],
  },
  {
    id: 2,
    title: "Red Team Assessment",
    description:
      "Simulated real-world attacks to test your detection and response capabilities against advanced threats.",
    icon: "🔴",
    features: [
      "Social Engineering",
      "Network Penetration",
      "Physical Security",
      "Zero-Day Simulation",
    ],
  },
  {
    id: 3,
    title: "VAPT Services",
    description:
      "Comprehensive vulnerability assessment and penetration testing to identify and remediate security gaps.",
    icon: "🛡️",
    features: [
      "Web Application Testing",
      "Mobile App Security",
      "API Security Testing",
      "Network Vulnerability",
    ],
  },
  {
    id: 4,
    title: "Compliance & Governance",
    description:
      "Achieve and maintain compliance with industry standards and regulations.",
    icon: "📋",
    features: ["ISO 27001", "SOC 2", "GDPR", "HIPAA"],
  },
  {
    id: 5,
    title: "Managed Detection & Response",
    description:
      "24/7 monitoring and rapid response to security incidents with expert analysis.",
    icon: "🚨",
    features: [
      "24/7 SOC Monitoring",
      "Threat Hunting",
      "Incident Response",
      "Forensic Analysis",
    ],
  },
  {
    id: 6,
    title: "Security Training",
    description:
      "Employee awareness and technical training to build security-first culture.",
    icon: "🎓",
    features: [
      "Phishing Simulation",
      "Secure Coding",
      "DevSecOps Training",
      "Executive Briefings",
    ],
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(services[0]);

  const scrollToServices = () => {
    const element = document.getElementById("services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      className="py-24 px-6 bg-linear-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-medium mb-4">
            Our Offerings
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive{" "}
            <span className="text-indigo-500">Security Services</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            End-to-end cybersecurity solutions tailored to protect your digital
            assets and ensure regulatory compliance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Service List */}
          <div className="space-y-4">
            {services.map((service) => (
              <motion.div
                key={service.id}
                onClick={() => setActiveService(service)} // ✅ IMPORTANT
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer bg-slate-900/50 backdrop-blur-sm border 
      ${
        activeService.id === service.id
          ? "border-indigo-500"
          : "border-slate-800"
      }
      rounded-2xl p-8`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-slate-400 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Service Details */}
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{activeService.icon}</div>
              <div>
                <h3 className="text-2xl font-bold">{activeService.title}</h3>
                <p className="text-indigo-400">Complete Security Solution</p>
              </div>
            </div>

            <p className="text-lg text-slate-300 mb-8">
              {activeService.description}
            </p>

            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Key Features</h4>
              <div className="grid grid-cols-2 gap-3">
                {activeService.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-slate-300 bg-slate-800/50 rounded-lg px-4 py-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={scrollToServices}
                className="flex-1 py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition"
              >
                Schedule Consultation
              </button>
              <button className="py-3 px-6 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-800 transition">
                View Case Study
              </button>
            </div>
          </motion.div>
        </div>

        {/* Service Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Projects Secured" },
            { value: "99.9%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Support Available" },
            { value: "50+", label: "Security Experts" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800"
            >
              <div className="text-3xl font-bold text-indigo-400">
                {stat.value}
              </div>
              <div className="text-slate-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
