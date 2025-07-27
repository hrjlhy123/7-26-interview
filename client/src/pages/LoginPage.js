// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Clear previous errors on submit

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle validation errors returned by backend (e.g. express-validator)
        if (data.errors) {
          setErrors(data.errors); // Array of { msg: string }
        } else {
          setErrors([{ msg: data.message || 'Login failed' }]);
        }
        return;
      }

      // On successful login
      localStorage.setItem('token', data.token);
      dispatch(loginUser(data.user));
      navigate('/tasks');
    } catch (err) {
      console.error('Login error:', err);
      setErrors([{ msg: 'Something went wrong. Please try again.' }]);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {/* Display error messages */}
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul className="mb-0">
            {errors.map((err, idx) => (
              <li key={idx}>{err.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
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

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <button
        type="button"
        className="btn btn-link mt-3"
        onClick={() => navigate('/register')}
      >
        Don&apos;t have an account? Register here
      </button>
    </div>
  );
}

export default LoginPage;
