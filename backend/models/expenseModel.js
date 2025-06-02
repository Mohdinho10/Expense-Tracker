import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: String,
    category: {
      type: String,
      required: true,
    }, // Example: "Food"
    amount: {
      type: Number,
      required: true,
    }, // Example: 100.50
    date: {
      type: Date,
      default: Date.now,
    }, // Example: "2023-10-01"
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
