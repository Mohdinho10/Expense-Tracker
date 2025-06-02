import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = Router();

router.get("/", isAuthenticated, getDashboardData);

export default router;
