import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-center px-6 ">
      <h2 className="text-4xl font-extrabold mb-4">Take Control of Your Finances</h2>
      <p className="text-md mb-8 opacity-90">
        Join thousands of smart users managing their money effortlessly.
      </p>

      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-primary px-6 py-3 font-semibold rounded-xl hover:bg-gray-100 transition duration-200"
      >
        Create Your Free Account
      </button>

      <div className="mt-10 flex items-center justify-center gap-2 text-sm text-white/90">
        <FaHeart className="text-red-400 animate-bounce" />
        <span className="italic tracking-wide font-medium">
          Made with love by{" "}
          <span className="text-yellow-300 font-bold underline decoration-wavy underline-offset-4">
            Prateek
          </span>
        </span>
      </div>
    </section>
  );
};

export default CallToAction;
