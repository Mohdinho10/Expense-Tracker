import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  downloadExpenseExcel,
  getExpenses,
} from "../controllers/expenseController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", isAuthenticated, getExpenses);
router.post("/", isAuthenticated, addExpense);
router.get("/downloadExcel", isAuthenticated, downloadExpenseExcel);
router.delete("/:id", isAuthenticated, deleteExpense);

export default router;
