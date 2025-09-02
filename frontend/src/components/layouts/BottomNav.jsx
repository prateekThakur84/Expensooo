import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTransaction } from '../../context/TransactionContext';
import {
  LuLayoutDashboard,
  LuTrendingUp,
  LuTrendingDown,
  LuWandSparkles,
  LuX,
  LuPlus,
  LuMinus,
} from 'react-icons/lu';
import { TbCurrencyRupee } from 'react-icons/tb'; // <-- New icon for the central button

const navItems = [
  { path: '/dashboard', icon: LuLayoutDashboard, label: 'Dashboard' },
  { path: '/income', icon: LuTrendingUp, label: 'Income' },
  { isSpacer: true },
  { path: '/expense', icon: LuTrendingDown, label: 'Expense' },
  { path: '/ai', icon: LuWandSparkles, label: 'Expenso AI' },
];

const BottomNav = () => {
  const location = useLocation();
  const { openAddIncomeModal, openAddExpenseModal } = useTransaction();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddIncome = () => {
    openAddIncomeModal();
    setIsMenuOpen(false);
  };

  const handleAddExpense = () => {
    openAddExpenseModal();
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-[1080px]:block hidden">
      {/* Arc Animation Menu */}
      <div
        // This container controls the visibility and interaction area of the menu
        className={`absolute bottom-16 right-1/2 mb-2 flex translate-x-1/2 items-center justify-center transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Income Button */}
        <button
          onClick={handleAddIncome}
          className={`absolute flex flex-col items-center gap-1.5 text-white transition-all duration-300 ease-in-out ${isMenuOpen ? '-translate-x-20 -translate-y-5' : 'translate-y-0'}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 shadow-lg">
            <LuPlus size={24} />
          </span>
          {/* <span className="text-xs font-semibold text-slate-700">Income</span> */}
        </button>
        
        {/* Expense Button */}
        <button
          onClick={handleAddExpense}
          className={`absolute flex flex-col items-center gap-1.5 text-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'translate-x-20 -translate-y-5' : 'translate-y-0'}`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-lg">
            <LuMinus size={24} />
          </span>
          {/* <span className="text-xs font-semibold text-slate-700">Expense</span> */}
        </button>
      </div>

      {/* Central Add Button */}
      <div className="absolute bottom-4 right-1/2 z-50 translate-x-1/2">
        <button
          onClick={handleAddClick}
          className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ${isMenuOpen ? 'bg-slate-600' : 'bg-primary'}`}
        >
          {/* Icon now swaps between Rupee and X instead of rotating */}
          {isMenuOpen ? <LuX size={30} /> : <TbCurrencyRupee size={30} />}
        </button>
      </div>
      
      {/* Main Navigation Bar */}
      <div className="grid h-16 grid-cols-5 border-t border-slate-200 bg-white font-medium shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {/* ... (This part remains the same) ... */}
        {navItems.map((item, index) => {
          if (item.isSpacer) return <div key={index} />;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;