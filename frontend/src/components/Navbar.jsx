import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h1>GreenThumb</h1>
            <div className="nav-links">
                {isAuthenticated ? (
                    <>
                        {/* We could decode token to get username, but for simplicity we rely on what we have or generic */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* Nav Links */}
                            <Link to="/">Dashboard</Link>
                            <Link to="/add-plant">Add Plant</Link>
                            <Link to="/forum">Forum</Link>

                            {/* Avatar & Logout */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(0,0,0,0.1)', padding: '5px 12px', borderRadius: '20px' }}>
                                <img
                                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${localStorage.getItem('username') || 'User'}`}
                                    alt="Avatar"
                                    className="avatar avatar-sm"
                                />
                                <a href="#!" onClick={handleLogout} style={{ marginLeft: '0', fontSize: '0.9rem' }}>Logout</a>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
