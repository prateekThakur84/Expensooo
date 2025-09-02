import React from "react";
import { FaWallet, FaChartLine, FaLock, FaFileDownload } from "react-icons/fa";
import { LuWandSparkles } from "react-icons/lu"; // 1. Import the AI icon

const features = [
  { icon: <FaWallet size={28} />, title: "Simple Tracking", desc: "Quickly log income and expenses." },
  { icon: <FaChartLine size={28} />, title: "Visual Reports", desc: "Interactive charts & dashboards." },
  // 2. Add the new Expenso AI feature
  { icon: <LuWandSparkles size={28} />, title: "AI Assistant", desc: "Get personalized financial insights." },
  { icon: <FaLock size={28} />, title: "Secure", desc: "Your data is protected with modern standards." },
  { icon: <FaFileDownload size={28} />, title: "Export Data", desc: "Download reports in Excel format." },
];

const FeaturesSection = () => (
  <section className="py-16 px-6 md:px-20 bg-indigo-50 text-center">
    <h2 className="text-3xl font-semibold mb-12">Features You’ll Love</h2>
    {/* 3. Update grid classes to be responsive for 5 items */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      {features.map((feature, i) => (
        <div 
          key={i} 
          className="bg-white p-6 rounded-xl shadow-sm flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="text-primary mb-4">{feature.icon}</div>
          <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
          <p className="text-gray-600 text-sm">{feature.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;