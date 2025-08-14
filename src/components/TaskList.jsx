import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDeleteTask, onToggleComplete }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500 dark:text-gray-300">
        No tasks yet. Add your first task!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.filter(Boolean).map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onToggleComplete={onToggleComplete}
          className="text-black dark:text-white" // pass class to TaskItem
        />
      ))}
    </div>
  );
}
