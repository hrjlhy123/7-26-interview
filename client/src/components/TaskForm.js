// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialValue, editing }) {
  const [input, setInput] = useState('');

  // Set input value when editing an existing task
  useEffect(() => {
    setInput(initialValue || '');
  }, [initialValue]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Ignore empty input
    onSubmit(input);           // Pass input to parent
    setInput('');              // Clear input after submit
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="btn btn-success" type="submit">
        {editing ? 'Update' : 'Add'}
      </button>
    </form>
  );
}

export default TaskForm;
