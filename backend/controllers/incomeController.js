import asyncHandler from "../middleware/asyncHandler.js";
import Income from "../models/incomeModel.js";
import xlsx from "xlsx";

export const addIncome = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { icon, source, amount, date } = req.body;

  if (!icon || !source || !amount || !date) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const newIncome = await Income.create({
    icon,
    source,
    amount,
    date: new Date(date),
    userId,
  });

  res.status(200).json(newIncome);
});

export const getIncomes = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const incomes = await Income.find({ userId }).sort({ date: -1 });

  res.status(200).json(incomes);
});

export const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findByIdAndDelete(req.params.id);

  if (!income) {
    res.status(404);
    throw new Error("Income not found");
  }

  res.status(200).json({ message: "Income deleted successfully" });
});

export const downloadIncomeExcel = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const incomes = await Income.find({ userId }).sort({ date: -1 });

  const data = incomes.map((income) => ({
    Source: income.source,
    Amount: income.amount,
    Date: income.date,
    // Date: income.date.toISOString().split("T")[0], // Format date to YYYY-MM-DD
  }));

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Income");
  xlsx.writeFile(wb, "income_details.xlsx");
  res.download("income_details.xlsx");
});
