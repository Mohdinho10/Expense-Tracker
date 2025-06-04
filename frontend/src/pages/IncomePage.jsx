import { useState } from "react";
import IncomeView from "../components/income/IncomeView";
import toast from "react-hot-toast";
import {
  useAddIncomeMutation,
  useDeleteIncomeMutation,
  useDownloadIncomeExcelMutation,
  useGetIncomesQuery,
} from "../slices/incomeApiSlice";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import AddIncomeInform from "../components/income/AddIncomeForm";
import IncomeList from "../components/income/IncomeList";
import DeleteAlert from "../components/DeleteAlert";

function IncomePage() {
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //  Get All Income
  const {
    data: incomeData = [],
    isError,
    isLoading,
    refetch,
  } = useGetIncomesQuery();

  //  Add Income
  const [addIncome] = useAddIncomeMutation();

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Income source is required");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Valid income amount is required");
      return;
    }

    if (!date) {
      toast.error("Income date is required");
      return;
    }

    try {
      await addIncome({ source, amount, date, icon }).unwrap();
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      refetch(); // Refresh income data after adding
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add income");
    }
  };

  //  Delete Income
  const [deleteIncome] = useDeleteIncomeMutation();

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id).unwrap();
      toast.success("Income deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete income");
    }
  };

  //  Handle download of income data
  const [downloadIncomeExcel] = useDownloadIncomeExcelMutation();

  const handleDownload = async () => {
    try {
      const blob = await downloadIncomeExcel().unwrap();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income-data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed");
    }
  };

  if (isLoading) <Loader />;

  if (isError) return <p className="text-red-500">Failed to load expenses</p>;
  return (
    <div className="mx-auto my-5">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <IncomeView
            transactions={incomeData}
            addIncomeHandler={() => setOpenAddIncomeModal(true)}
          />
        </div>
        <IncomeList
          transactions={incomeData}
          deleteHandler={(id) =>
            setOpenDeleteAlert({
              show: true,
              data: id,
            })
          }
          downloadHandler={handleDownload}
        />
      </div>
      <Modal
        isOpen={openAddIncomeModal}
        closeHandler={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeInform addIncomeHandler={handleAddIncome} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        closeHandler={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want this income details?"
          deleteHandler={() => handleDeleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </div>
  );
}

export default IncomePage;
