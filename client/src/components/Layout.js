// src/components/Layout.js
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Logout and redirect to login
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const isLoginPage = location.pathname === '/';
    const isRegisterPage = location.pathname === '/register';
    const isLoggedIn = !!user;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/tasks">ToDoApp</Link>
                    <div className="d-flex align-items-center">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white me-3">👤 {user.username}</span>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {isLoginPage && (
                                    <Link className="btn btn-outline-light btn-sm" to="/register">
                                        Sign Up
                                    </Link>
                                )}
                                {isRegisterPage && (
                                    <Link className="btn btn-outline-light btn-sm" to="/">
                                        Login
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container mt-4">{children}</div>
        </div>
    );
}

export default Layout;