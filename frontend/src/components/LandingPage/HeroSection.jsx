import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/finance-hero.png";
import { FaWallet } from "react-icons/fa";
import { UserContext } from "../../context/userContext";
const HeroSection = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const isAuthenticated = user || localStorage.getItem("token");

  return (
    <section className="py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-100 gap-4">
      <div className="max-w-xl mb-10 md:mb-0">
        <div className="flex items-center gap-2 p-2">
          <FaWallet className="text-4xl text-primary" />
          <h1 className="text-4xl font-medium m-4">Expenso</h1>
        </div>
        <h2 className="text-2xl mb-4">Track. Analyze. Grow.</h2>
        <p className="text-lg mb-6 text-gray-600">
          Manage your income and expenses seamlessly with our smart personal
          finance dashboard.
        </p>

        <div className="flex gap-4">
          {isAuthenticated ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>

      <img
        src={heroImg}
        alt="Finance Dashboard"
        className="w-full md:w-1/2 max-w-[600px] rounded-xl shadow-lg object-contain"
      />
    </section>
  );
};

export default HeroSection;
