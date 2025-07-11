import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-primary text-white text-center px-6">
      <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
      <p className="text-md mb-6">Join now and start managing your money like a pro.</p>
      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-primary px-6 py-3 font-semibold rounded-lg hover:bg-gray-100"
      >
        Create Your Free Account
      </button>
    </section>
  );
};

export default CallToAction;
