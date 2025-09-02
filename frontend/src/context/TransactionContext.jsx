import React, { createContext, useState, useContext } from 'react';

const TransactionContext = createContext();

export const useTransaction = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  
  // This state will be used to trigger a data refetch on any page
  const [refetch, setRefetch] = useState(false);

  const openAddIncomeModal = () => setIsAddIncomeOpen(true);
  const closeAddIncomeModal = () => setIsAddIncomeOpen(false);
  
  const openAddExpenseModal = () => setIsAddExpenseOpen(true);
  const closeAddExpenseModal = () => setIsAddExpenseOpen(false);

  // Call this function after adding a new transaction to refresh data across the app
  const triggerRefetch = () => setRefetch(prev => !prev);

  const value = {
    isAddIncomeOpen,
    openAddIncomeModal,
    closeAddIncomeModal,
    isAddExpenseOpen,
    openAddExpenseModal,
    closeAddExpenseModal,
    triggerRefetch,
    refetch,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};