import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/auth/register', formData);
            alert('Registration Successful! Please Login.'); // Simple alert for student project
            navigate('/login');
        } catch (err) {
            console.error(err); // Log full error
            const errorMsg = err.response?.data?.msg || 'Registration Failed - Check Network/Server';
            alert(errorMsg);
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" value="Register" className="btn btn-block" />
            </form>
        </div>
    );
};

export default Register;
