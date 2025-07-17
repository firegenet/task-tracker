export default function Task({ task, onDelete, onToggle }) {
  return (
    <div 
      className={`p-3 my-2 border-l-4 rounded shadow-sm cursor-pointer 
        ${task.reminder ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{task.text}</h3>
          <p className="text-sm text-gray-500">{task.day}</p>
        </div>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}