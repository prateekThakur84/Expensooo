import React, { useState } from "react";
import { FaUnlockAlt, FaUser, FaKey } from "react-icons/fa";

const DemoCredentials = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-1 border border-dashed border-primary rounded-lg p-4 bg-purple-50 mb-4">
      <button
  onClick={() => setShow(!show)}
  className="flex flex-col items-start text-primary font-medium hover:underline transition-all"
>
  <div className="flex items-center gap-2">
    <FaUnlockAlt />
    <span>{show ? "Hide Demo Credentials" : "Unlock Demo Credentials"}</span>
  </div>
  {!show && (
    <span className="text-xs text-slate-600 mt-1">
      This is just a quick peek! – We'd love if you Sign Up ❤️
    </span>
  )}
  {show && (
    <span className="text-xs text-slate-600 mt-1">
      We really recommend signing up — it's free ✨
    </span>
  )}
</button>


      {show && (
        <div className="mt-4 text-sm text-gray-700 space-y-2 animate-fade-in">
          <p className="flex items-center gap-2">
            <FaUser className="text-primary" />{" "}
            <span className="font-semibold">Email:</span> gwen@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaKey className="text-primary" />{" "}
            <span className="font-semibold">Password:</span> Gwen@123
          </p>
        </div>
      )}
    </div>
  );
};

export default DemoCredentials;
