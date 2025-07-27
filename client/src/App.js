// src/App.js
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from './redux/userSlice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ToDoPage from './pages/ToDoPage';
import Layout from './components/Layout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(loginUser(user));
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
      }
    }
  }, []);

  return (
    <Router basename={process.env.NODE_ENV === 'production' ? '/7-26-interview' : ''}>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<ToDoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;