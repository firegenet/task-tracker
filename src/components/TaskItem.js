export default function TaskItem({ task, onDeleteTask, onToggleComplete }) {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition duration-200">
      <div className="flex items-center gap-3 flex-1">
        {/* Checkbox/Completion Toggle */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`h-5 w-5 rounded-full border flex items-center justify-center transition ${
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-blue-500"
          }`}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Text */}
        <span
          className={`text-lg flex-1 ${
            task.completed ? "line-through text-gray-400" : "text-gray-700"
          }`}
        >
          {task.text}
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDeleteTask(task.id)}
        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition duration-200 ml-2"
        aria-label="Delete task"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}