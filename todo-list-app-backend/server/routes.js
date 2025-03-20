import express from "express";
import mongoose from "mongoose";

const router = express.Router();


const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model("Task", TaskSchema);

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  const newTask = new Task({ title });
  await newTask.save();
  res.status(201).json(newTask);
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted" });
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(updatedTask);
});

export default router;
