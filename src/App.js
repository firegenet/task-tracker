import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';
import Register from './Register';
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import Spinner from "./components/Spinner";
import { getTasks, deleteTask, toggleTaskCompletion, addTask } from "./api";

// ✅ Updated TaskApp only
function TaskApp({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await getTasks();
        setTasks(
          data.map((task) => ({
            id: task.id,
            text: task.text,
            completed: task.completed === 1 || task.completed === true,
            createdAt: task.created_at,
            description: task.description || "",
          }))
        );
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (text, description = "") => {
    if (!text.trim()) {
      toast.error("Task cannot be empty");
      return;
    }
    try {
      const newTask = await addTask({ text, description, completed: false });
      setTasks([...tasks, {
        id: newTask.id,
        text: newTask.text,
        completed: newTask.completed === 1 || newTask.completed === true,
        createdAt: newTask.created_at || new Date().toISOString(),
        description: newTask.description || "",
      }]);
      toast.success("Task added!");
    } catch (error) {
      toast.error("Failed to add task");
    }
  };

 const handleDeleteTask = async (id) => {
  try {
    await deleteTask(id); // calls API
    setTasks(tasks.filter((task) => task.id !== id)); // removes from state
    toast.success("Task deleted!");
  } catch (error) {
    toast.error("Failed to delete task");
    console.error(error);
  }
};


  const handleToggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      if (!taskToUpdate) return;
      await toggleTaskCompletion(id, !taskToUpdate.completed);
      setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
      toast.success("Task updated!");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // ✅ Fixed return with small logout button
  return (
    <div className={`relative min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}` }>
      {/* Logout button in top-right corner */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            onLogout();
          }}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
      <div className="absolute top-4 right-24 flex items-center gap-2">
  <button
    onClick={() => setDarkMode(!darkMode)}
    className="px-3 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 transition"
  >
    {darkMode ? "🌞 Light" : "🌙 Dark"}
  </button>
</div>


      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full">
          <AddTaskForm onAddTask={handleAddTask} />

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center sm:justify-start">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-1 rounded-full font-medium ${
                  filter === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

// ❌ Rest of App.js unchanged
export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser({ token });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/tasks" /> : <Login onLoginSuccess={setUser} />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/tasks" /> : <Register onRegisterSuccess={() => toast.success("Registered! Please login.")} />}
        />
        <Route
          path="/tasks"
          element={user ? <TaskApp onLogout={() => setUser(null)} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
