"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Task {
  _id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>("http://localhost:5001/api/tasks");
      setTasks(response.data || []);  // ✅ Varmistetaan, että data on taulukko
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      await axios.post("http://localhost:5001/api/tasks", { title: newTask });
      setNewTask("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task && task._id !== id)); // ✅ Varmistetaan, että task ei ole null
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task && task._id === id ? response.data : task))); // ✅ Tarkistetaan task
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">To-Do List</h1>
      
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Lisää uusi tehtävä..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-3 w-80 bg-gray-800 border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={addTask} className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition-all">
          Lisää
        </button>
      </div>

      <ul className="w-96 space-y-2">
        {tasks.map((task) => (
          task ? ( 
            <li 
              key={task._id} 
              className={`p-4 rounded flex justify-between items-center cursor-pointer transition-all ${
                task.completed ? "line-through text-gray-400 bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => toggleComplete(task._id, task.completed)}
            >
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
                ✖
              </button>
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
}
