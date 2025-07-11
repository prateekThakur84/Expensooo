import React from "react";
import { useNavigate } from "react-router-dom";
import noDataImg from "../assets/NoData.png"; // adjust path as needed

const NoDashboardData = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <img
        src={noDataImg}
        alt="No dashboard data"
        className="w-64 h-64 mb-6 opacity-80 object-contain"
      />
      <h2 className="text-xl font-semibold text-gray-700">
        No Dashboard Data Available
      </h2>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        Start by adding your first <strong>income</strong> or{" "}
        <strong>expense</strong> to see financial insights and charts here.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/income")}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Income
        </button>
        <button
          onClick={() => navigate("/expense")}
          className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default NoDashboardData;
