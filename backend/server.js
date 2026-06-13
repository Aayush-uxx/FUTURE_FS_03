import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbCon from "./config/db.js";
import requestRoutes from "./routes/requestRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
dbCon();
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;
app.use("/api/request", requestRoutes);
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
