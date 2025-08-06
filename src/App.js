import { useState, useEffect } from "react";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import Spinner from "./components/Spinner";
import toast from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend API
  useEffect(() => {
    const fetchInitialTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/tasks");
        const data = await response.json();
        
        // Transform backend data to match frontend structure
        const formattedTasks = data.map(task => ({
          id: task.id,
          text: task.title || task.text,
          completed: task.completed || false,
          createdAt: task.createdAt || new Date().toISOString()
        }));
        
        setTasks(formattedTasks);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialTasks();
  }, []);

  // Save tasks to backend API
  const syncTasksToBackend = async (updatedTasks) => {
    try {
      await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTasks),
      });
    } catch (error) {
      console.error("Error syncing tasks:", error);
    }
  };

  // Sync tasks when they change
  useEffect(() => {
    if (tasks.length > 0) {
      syncTasksToBackend(tasks);
    }
  }, [tasks]);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  // Add new task
  const addTask = async (text) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: text,
          completed: false 
        }),
      });
      const newTask = await response.json();
      
      const formattedTask = {
        id: newTask.id,
        text: newTask.title || text,
        completed: newTask.completed || false,
        createdAt: newTask.createdAt || new Date().toISOString()
      };
      
      setTasks([...tasks, formattedTask]);
      toast.success('Task added!');
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error('Failed to add task');
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted!');
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error('Failed to delete task');
    }
  };

  // Toggle task completion
  const toggleComplete = async (id) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      await fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          completed: !taskToUpdate.completed 
        }),
      });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
      toast.success('Task updated!');
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error('Failed to update task');
    }
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