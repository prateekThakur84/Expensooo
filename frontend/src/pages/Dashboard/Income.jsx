import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modals/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";
import noData from "../../assets/new.png";
import Loading from "../../components/Loading";

const Income = ({ transactions, onAddIncome }) => {
  useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [OpenAddIncomeModel, setOpenAddIncomeModel] = useState(false);
  //get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong !! Please try agian", error);
    } finally {
      setLoading(false);
    }
  };

  const isIncomeEmpty = !incomeData || incomeData.length === 0;

  //handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is Required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModel(false);
      toast.success("Income Added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // delete income

  const deleteIncome = async (id) => {
    try {
      // console.log("delete income");

      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income Detail deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error deleting income: ",
        error.response?.data?.message || error.message
      );
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      console.log("downloaded income data");

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Income details downloaded successfully!");
    } catch (error) {
      console.error("Error downloading income details: ", error);
      toast.error("Failed to download income details. Please try again!");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        {loading ? (
          <Loading/>
        ) : isIncomeEmpty ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={noData}
              alt="No data"
              className="w-64 h-64 mb-6 opacity-80"
            />
            <h2 className="text-xl font-semibold text-gray-700">
              No Income Records Available
            </h2>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Add your income sources to keep track of your earnings.
            </p>
            <button
              className="mt-6 add-btn add-btn-fill"
              onClick={() => setOpenAddIncomeModel(true)}
            >
              Add Income
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModel(true)}
            />

            <IncomeList
              transactions={incomeData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id });
              }}
              onDownload={handleDownloadIncomeDetails}
            />
          </div>
        )}

        <Modal
          isOpen={OpenAddIncomeModel}
          onClose={() => setOpenAddIncomeModel(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
