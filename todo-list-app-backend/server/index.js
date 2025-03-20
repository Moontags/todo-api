import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import taskRoutes from "./routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Yhdistetään MongoDB
connectDB();

// Testireitti
app.get("/", (req, res) => {
  res.send("To-Do List API is running...");
});

// Käytetään reittejä
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
