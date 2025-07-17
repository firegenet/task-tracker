import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import Spinner from "./components/Spinner";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Initialize tasks with localStorage or default values
  useEffect(() => {
    const fetchInitialTasks = () => {
      try {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        } else {
          // Default tasks if nothing in localStorage
          setTasks([
            { id: 1, text: "Learn React", completed: false },
            { id: 2, text: "Build a Task Tracker", completed: true }
          ]);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTasks();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <AddTaskForm onAddTask={addTask} />
          
          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <button 
              onClick={() => setFilter("all")} 
              className={`px-3 py-1 rounded ${
                filter === "all" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("active")}
              className={`px-3 py-1 rounded ${
                filter === "active" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 rounded ${
                filter === "completed" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              Completed
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={deleteTask}
              onToggleComplete={toggleComplete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;