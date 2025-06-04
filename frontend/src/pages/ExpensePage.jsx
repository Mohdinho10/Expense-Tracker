import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useDownloadExpenseExcelMutation,
  useGetExpensesQuery,
} from "../slices/expenseApiSlice";
import ExpenseView from "../components/expense/ExpenseView";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import AddExpenseForm from "../components/expense/AddExpenseForm";
import ExpenseList from "../components/expense/ExpenseList";
import DeleteAlert from "../components/DeleteAlert";

function ExpensePage() {
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const {
    data: expenseData = [],
    isLoading,
    isError,
    refetch,
  } = useGetExpensesQuery();

  const [addExpense] = useAddExpenseMutation();
  const [deleteExpense] = useDeleteExpenseMutation();
  const [downloadExpenseExcel] = useDownloadExpenseExcelMutation();

  // Add Expense Handler
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Expense category is required");
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Valid expense amount is required");
      return;
    }

    if (!date) {
      toast.error("Expense date is required");
      return;
    }

    try {
      await addExpense({ category, amount, date, icon }).unwrap();
      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add expense");
    }
  };

  // Delete Expense Handler
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id).unwrap();
      toast.success("Expense deleted successfully");
      setOpenDeleteAlert({ show: false, data: null });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete expense");
    }
  };

  // Download Excel
  const handleDownload = async () => {
    try {
      const blob = await downloadExpenseExcel().unwrap();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "expenses.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Download started");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download expenses");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to load expenses</p>;

  return (
    <div className="mx-auto my-5">
      <div className="grid grid-cols-1 gap-6">
        <div className="">
          <ExpenseView
            transactions={expenseData}
            addExpenseHandler={() => setOpenAddExpenseModal(true)}
          />
        </div>
        <ExpenseList
          transactions={expenseData}
          deleteHandler={(id) => setOpenDeleteAlert({ show: true, data: id })}
          downloadHandler={handleDownload}
        />
      </div>
      <Modal
        isOpen={openAddExpenseModal}
        closeHandler={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm addExpenseHandler={handleAddExpense} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        closeHandler={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want this expense details?"
          deleteHandler={() => handleDeleteExpense(openDeleteAlert.data)}
        />
      </Modal>
    </div>
  );
}

export default ExpensePage;
