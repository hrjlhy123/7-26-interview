// src/pages/ToDoPage.js
import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ToDoPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [error, setError] = useState(null); // Handle error display
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
            setError('Failed to load tasks.');
        }
    };

    // Run on component mount
    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchTasks();
    }, []);

    // Add or update a task
    const handleTaskSubmit = async (text) => {
        try {
            if (editTask) {
                const res = await fetch(`/api/tasks/${editTask._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error();
                const updated = await res.json();
                setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
                setEditTask(null);
            } else {
                const res = await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ text }),
                });
                if (!res.ok) throw new Error();
                const newTask = await res.json();
                setTasks((prev) => [newTask, ...prev]);
            }
        } catch (err) {
            console.error('Failed to submit task:', err);
            setError(editTask ? 'Failed to update task.' : 'Failed to add task.');
        }
    };

    // Set task to be edited
    const handleEdit = (task) => {
        setEditTask(task);
    };

    // Delete task by ID
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error('Failed to delete task:', err);
            setError('Failed to delete task.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">📝 To-Do List</h2>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="card p-4 mb-4 shadow-sm">
                <TaskForm
                    onSubmit={handleTaskSubmit}
                    initialValue={editTask ? editTask.text : ''}
                    editing={!!editTask}
                />
            </div>

            <ul className="list-group shadow-sm">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{task.text}</span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit(task)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoPage;
