// src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialValue, editing }) {
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(initialValue || '');
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
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
