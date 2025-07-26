// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegisterPage() {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(form)); // 假设后续处理异步请求
        console.log('提交注册:', form);
    };

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
