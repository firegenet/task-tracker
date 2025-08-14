import React from "react";

export default function TaskItem({ task, onDeleteTask, onToggleComplete, className }) {
  return (
    <div
      className={`flex justify-between items-center p-2 border rounded ${className}`}
    >
      <div
        className={`flex-1 cursor-pointer ${task.completed ? "line-through text-gray-400 dark:text-gray-400" : ""}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.text}
        {task.description && (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {task.description}
          </div>
        )}
      </div>
      <button
        onClick={() => onDeleteTask(task.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}