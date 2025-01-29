import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { checkConnection } from "./src/config/db.js";
// import createAllTable from "./src/utils/dbUtils.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5174",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use("/user", userRoutes);
app.use("/post", postRoutes);

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await checkConnection();
    // await createAllTable();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
});
