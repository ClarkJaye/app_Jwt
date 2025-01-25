import express from "express";
import userRoutes from './src/routes/userRoutes'

const app = express();

app.use(express.json())
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});