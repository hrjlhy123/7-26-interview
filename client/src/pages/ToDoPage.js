// src/pages/ToDoPage.js
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ToDoPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [error, setError] = useState(null); // ⬅️ 新增
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchTasks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('获取任务失败:', err);
            setError('Failed to load tasks.');
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }
        fetchTasks();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleTaskSubmit = async (text) => {
        try {
            if (editTask) {
                const res = await fetch(`http://localhost:5000/api/tasks/${editTask._id}`, {
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
                const res = await fetch('http://localhost:5000/api/tasks', {
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
            console.error('提交任务失败:', err);
            setError(editTask ? 'Failed to update task.' : 'Failed to add task.');
        }
    };

    const handleEdit = (task) => {
        setEditTask(task);
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error();
            setTasks((prev) => prev.filter((t) => t._id !== id));
        } catch (err) {
            console.error('删除任务失败:', err);
            setError('Failed to delete task.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>
                <span>To-Do List</span>
                <button className="btn btn-outline-secondary" onClick={handleLogout}>
                    Logout
                </button>
            </h2>

            {/* 🔴 显示错误 */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <TaskForm
                onSubmit={handleTaskSubmit}
                initialValue={editTask ? editTask.text : ''}
                editing={!!editTask}
            />

            {/* 任务列表 */}
            <ul className="list-group">
                {tasks.map((task) => (
                    <li key={task._id} className="list-group-item d-flex justify-content-between">
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
