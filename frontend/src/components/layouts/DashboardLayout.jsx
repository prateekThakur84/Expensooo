import React, { use, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { LuWandSparkles } from "react-icons/lu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  // console.log(user);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          <div className="grow mx-5">{children}</div>

          <div
            onClick={() => (window.location.href = "/ai")}
            className="fixed bottom-5 right-5 bg-primary text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer z-50"
            title="Launch Expenso AI"
          >
            <LuWandSparkles size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
