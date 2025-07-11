import React from "react";
import { FaWallet, FaChartLine, FaLock, FaFileDownload } from "react-icons/fa";

const features = [
  { icon: <FaWallet size={28} />, title: "Simple Tracking", desc: "Quickly log income and expenses." },
  { icon: <FaChartLine size={28} />, title: "Visual Reports", desc: "Interactive charts & dashboards." },
  { icon: <FaLock size={28} />, title: "Secure", desc: "Your data is protected with modern standards." },
  { icon: <FaFileDownload size={28} />, title: "Export Data", desc: "Download reports in Excel format." },
];

const FeaturesSection = () => (
  <section className="py-16 px-6 md:px-20 bg-indigo-50 text-center">
    <h2 className="text-3xl font-semibold mb-10">Features You’ll Love</h2>
    <div className="grid md:grid-cols-4 gap-6">
      {features.map((feature, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div className="text-primary mb-3">{feature.icon}</div>
          <h4 className="font-semibold mb-1">{feature.title}</h4>
          <p className="text-gray-600 text-sm">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
