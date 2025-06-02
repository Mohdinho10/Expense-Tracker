import asyncHandler from "../middleware/asyncHandler.js";
import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
import { Types } from "mongoose";

export const getDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userObjectId = new Types.ObjectId(String(userId));

  // Fetch total income
  const totalIncome = await Income.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  // Fetch total expenses
  const totalExpenses = await Expense.aggregate([
    { $match: { userId: userObjectId } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  //   Get income transactions in the last 60 days
  const last60DaysIncomeTransactions = await Income.find({
    userId,
    date: {
      $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    },
  }).sort({ date: -1 });

  //   Get total income for last 60 days
  const incomeLast60Days = last60DaysIncomeTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  //   Get expense transactions in the last 30 days
  const last30DaysExpenseTransactions = await Expense.find({
    userId,
    date: {
      $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  }).sort({ date: -1 });

  //   Get total expenses for last 30 days
  const expensesLast30Days = last30DaysExpenseTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  //   Fetch last 5 income transactions (income + expense)
  const lastTransactions = [
    ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
      (transaction) => ({
        ...transaction.toObject(),
        type: "income",
      })
    ),
    ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
      (transaction) => ({
        ...transaction.toObject(),
        type: "expense",
      })
    ),
  ].sort((a, b) => b.date - a.date);

  res.json({
    totalBalance: (totalIncome[0]?.total || 0) - (totalExpenses[0]?.total || 0),
    totalIncome: totalIncome[0]?.total || 0,
    totalExpenses: totalExpenses[0]?.total || 0,
    last30DaysExpenses: {
      total: expensesLast30Days,
      transactions: last30DaysExpenseTransactions,
    },
    last60DaysIncome: {
      total: incomeLast60Days,
      transactions: last60DaysIncomeTransactions,
    },
    recentTransactions: lastTransactions,
  });
});
