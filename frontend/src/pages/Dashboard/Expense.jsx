import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modals/Modal";
import toast from "react-hot-toast";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";
import noData from "../../assets/new.png";
import Loading from "../../components/Loading";

const Expense = () => {
  useUserAuth();

  const [ExpenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModel, setOpenAddExpenseModel] = useState(false);

  //get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
        // console.log(response.data);
      }
    } catch (error) {
      console.log("Something went wrong !! Please try agian", error);
    } finally {
      setLoading(false);
    }
  };

  const isExpenseEmpty = !ExpenseData || ExpenseData.length === 0;

  //handle add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is Required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModel(false);
      toast.success("Expense Added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      // console.log("downloaded data");

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Expense details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading expense details: ", error);
      toast.error("Failed to download expense details. Please try again!");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto ">
        {loading ? (
          <Loading/>
        ) : isExpenseEmpty ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={noData}
              alt="No data"
              className="w-64 h-64 mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No Expense Records Found
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Add your first <strong>expense</strong> to start tracking your
              spending.
            </p>
            <button
              className="mt-6 add-btn add-btn-fill"
              onClick={() => setOpenAddExpenseModel(true)}
            >
              Add Expense
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <ExpenseOverview
              transactions={ExpenseData}
              onExpenseIncome={() => setOpenAddExpenseModel(true)}
            />
            <ExpenseList
              transactions={ExpenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadExpenseDetails}
            />
          </div>
        )}

        <Modal
          isOpen={openAddExpenseModel}
          onClose={() => setOpenAddExpenseModel(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() =>
            setOpenDeleteAlert({
              show: false,
              data: null,
            })
          }
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
