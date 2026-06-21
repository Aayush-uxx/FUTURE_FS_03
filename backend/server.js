import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbCon from "./config/db.js";
import requestRoutes from "./routes/requestRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
dotenv.config();
// Connect to Database
dbCon();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/request", requestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);

// Also mount routes at root for simpler production URLs
app.use("/request", requestRoutes);
app.use("/auth", authRoutes);
app.use("/services", serviceRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Barbershop API is running..." });
});

// Only listen if not running as a serverless function
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
}

export default app;
