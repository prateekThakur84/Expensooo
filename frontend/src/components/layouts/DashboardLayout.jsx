import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import { useTransaction } from '../../context/TransactionContext'; // <-- Import useTransaction
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import BottomNav from './BottomNav';
import Modal from '../Modals/Modal'; // <-- Import Modal and forms
import AddIncomeForm from '../Income/AddIncomeForm';
import AddExpenseForm from '../Expense/AddExpenseForm';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const { 
    isAddIncomeOpen, 
    closeAddIncomeModal,
    isAddExpenseOpen,
    closeAddExpenseModal,
    triggerRefetch 
  } = useTransaction();

  // --- Logic moved from Income/Expense pages ---
  const handleAddIncome = async (income) => {
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, income);
      toast.success("Income Added successfully");
      closeAddIncomeModal();
      triggerRefetch(); // Trigger a global data refresh
    } catch (error) {
      toast.error("Failed to add income.");
      console.error("Error adding income:", error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, expense);
      toast.success("Expense Added successfully");
      closeAddExpenseModal();
      triggerRefetch(); // Trigger a global data refresh
    } catch (error) {
      toast.error("Failed to add expense.");
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbfc]">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <>
          <div className="flex">
            <div className="max-[1080px]:hidden">
              <SideMenu activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5 pb-20 max-[1080px]:pb-24">{children}</div>
          </div>

          <BottomNav />
          
          {/* --- Global Modals --- */}
          <Modal isOpen={isAddIncomeOpen} onClose={closeAddIncomeModal} title="Add Income">
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Modal>

          <Modal isOpen={isAddExpenseOpen} onClose={closeAddExpenseModal} title="Add Expense">
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;