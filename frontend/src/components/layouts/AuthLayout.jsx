import React from "react";
import CARD_2 from "../../assets/login3.jpg";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12    ">
        <div className="flex items-center gap-4" onClick={()=>navigate("/about")}>
          <FaWallet className="text-4xl text-primary" />
          <h2 className="text-4xl font-medium text-black" >Expenso</h2>
        </div>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative ">
        <img
          src={CARD_2}
          className="w-64 lg:w-[90%] absolute bottom-1 shadow-lg shadow-blur-400/15"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
