import React from "react";
import CARD_2 from "../../assets/login3.jpg";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center w-full md:w-3/5 px-8 sm:px-12 py-10 bg-white">
        {/* Logo + Title */}
        <div
          className="flex items-center gap-4 mb-12 cursor-pointer select-none"
          onClick={() => navigate("/about")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && navigate("/about")}
          aria-label="Navigate to About page"
        >
          <FaWallet className="text-5xl text-primary" />
          <h2 className="text-4xl font-semibold text-black tracking-wide">Expenso</h2>
        </div>

        {/* Centered children content */}
        <div className="w-full max-w-lg">{children}</div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden md:block w-2/5 h-screen bg-violet-50 relative">
        <div
          className="absolute inset-0 bg-auth-bg-img bg-cover bg-center bg-no-repeat opacity-40"
          aria-hidden="true"
        />
        <img
          src={CARD_2}
          className="w-64 lg:w-4/5 absolute bottom-8 right-8 shadow-xl rounded-2xl"
          alt="auth card"
          loading="lazy"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
