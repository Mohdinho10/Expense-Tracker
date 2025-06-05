import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";

dotenv.config();

const app = express();

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// cookie parser middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin:
      "http://localhost:5173 || https://expense-tracker-tpxc.onrender.com/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(morgan("dev"));

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Serve static files
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  // app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Serve frontend build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads

  // app.get("*", (req, res) =>
  //   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  // );
} else {
  const __dirname = path.resolve();
  app.use(
    "/uploads",
    express.static(path.join(__dirname, "public", "uploads"))
  ); // Serve uploads in development
}

app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongoose connected successfully"))
  .catch((err) => err);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
