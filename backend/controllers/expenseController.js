import asyncHandler from "../middleware/asyncHandler.js";
import Expense from "../models/expenseModel.js";
import xlsx from "xlsx";

export const getExpenses = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const expenses = await Expense.find({ userId }).sort({ date: -1 });

  res.status(200).json(expenses);
});

export const addExpense = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { icon, category, amount, date } = req.body;

  if (!category || !amount || !date) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const newExpense = await Expense.create({
    icon,
    category,
    amount,
    date: new Date(date),
    userId,
  });

  res.status(200).json(newExpense);
});

export const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    res.status(404);
    throw new Error("Expense not found");
  }

  res.status(200).json({ message: "Expense deleted successfully" });
});

export const downloadExpenseExcel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const expenses = await Expense.find({ userId }).sort({ date: -1 });

  const data = expenses.map((expense) => ({
    Category: expense.category, // or expense.category if you use that instead
    Amount: expense.amount,
    Date: expense.date, // Format if needed: expense.date.toISOString().split("T")[0]
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Expenses");
  xlsx.writeFile(wb, "expense_details.xlsx");
  res.download("expense_details.xlsx");
});
