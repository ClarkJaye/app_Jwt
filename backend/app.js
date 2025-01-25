import express from "express";
import { checkConnection } from "./src/config/db.js";
// import createAllTable from "./src/utils/dbUtils.js";
import userRoutes from "./src/routes/userRoutes.js";

const app = express();

app.use(cors())

app.use(express.json());
app.use("/api/users", userRoutes);

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
