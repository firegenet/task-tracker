import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    onAddTask(text, description); // Pass description to parent
    setText("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Task title"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded px-3 py-2"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2"
        rows={3}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;