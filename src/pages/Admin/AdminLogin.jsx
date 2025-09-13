import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'

export default function AdminLogin({ setAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_FRONTEND_URL}/api/login`, {
                email,
                password
            });
            const { token } = response.data;
            localStorage.setItem('adminToken', token); // Save the token to local storage
            setAuth(true); // Update the auth state to show the actual content
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div className="text-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
