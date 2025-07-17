import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDeleteTask, onToggleComplete }) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 italic">No tasks yet. Add your first task above!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onToggleComplete={onToggleComplete}
          />
        ))
      )}
    </div>
  );
}