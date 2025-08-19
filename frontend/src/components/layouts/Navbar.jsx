import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const navigate = useNavigate();
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-5 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>
      <div className="flex items-center justify-between w-full px-4 cursor-pointer">
        <div
          className="flex items-center gap-2"
          onClick={() => navigate("/LandingPage")}
        >
          <FaWallet className="text-2xl text-primary" />
          <h1 className="text-2xl font-semibold">Expenso</h1>
        </div>
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
