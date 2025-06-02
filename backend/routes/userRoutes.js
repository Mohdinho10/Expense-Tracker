import { Router } from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = Router();

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), register);
router.post("/login", login);
router.use(isAuthenticated);
router.post("/logout", logout);
router.get("/profile", getUserProfile);

export default router;
