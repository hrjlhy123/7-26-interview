// src/pages/ToDoPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, editTask } from '../redux/taskSlice';
import TaskForm from '../components/TaskForm'; // ✅ 引入组件
import 'bootstrap/dist/css/bootstrap.min.css';

function ToDoPage() {
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.tasks);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        if (editIndex !== null) {
            dispatch(editTask({ index: editIndex, text: input }));
            setEditIndex(null);
        } else {
            dispatch(addTask(input));
        }

        setInput('');
    };

    const handleEdit = (index) => {
        setInput(tasks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        dispatch(deleteTask(index));
    };

    return (
        <div className="container mt-5">
            <h2>To-Do List</h2>
            <TaskForm
                onSubmit={(text) => {
                    if (editIndex !== null) {
                        dispatch(editTask({ index: editIndex, text }));
                        setEditIndex(null);
                    } else {
                        dispatch(addTask(text));
                    }
                }}
                initialValue={editIndex !== null ? tasks[editIndex] : ''}
                editing={editIndex !== null}
            />

            <ul className="list-group">
                {tasks.map((task, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <span>{task}</span>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(index)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoPage;