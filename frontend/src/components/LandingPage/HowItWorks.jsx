  import React from "react";
  import { FaChartLine, FaWallet, FaFileDownload } from "react-icons/fa";
import { LuWandSparkles } from "react-icons/lu";

  const steps = [
    {
      title: "1. Add Income & Expenses",
      desc: "Easily input your financial transactions.",
      icon: <FaWallet size={28} />,
    },
    {
      title: "2. Visualize Insights",
      desc: "Pie charts and bar graphs give you instant clarity.",
      icon: <FaChartLine size={28} />,
    },
    {
      title: "3. Download Reports",
      desc: "Export your financial data for offline use.",
      icon: <FaFileDownload size={28} />,
    },
     {
    title: "4. Chat with Expenso AI",
    desc: "Ask questions about your spending and get personalized financial insights.",
    icon: <LuWandSparkles size={28} />,
  },
  ];

  const HowItWorks = () => (
    <section className="py-16 px-6 md:px-20 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
      <div className="grid md:grid-cols-2 gap-10">
        {steps.map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="text-primary mb-4">{item.icon}</div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );

  export default HowItWorks;
