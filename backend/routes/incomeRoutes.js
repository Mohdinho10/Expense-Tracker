import { Router } from "express";
import {
  addIncome,
  deleteIncome,
  downloadIncomeExcel,
  getIncomes,
} from "../controllers/incomeController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", isAuthenticated, getIncomes);
router.post("/", isAuthenticated, addIncome);
router.get("/downloadExcel", isAuthenticated, downloadIncomeExcel);
router.delete("/:id", isAuthenticated, deleteIncome);

export default router;
