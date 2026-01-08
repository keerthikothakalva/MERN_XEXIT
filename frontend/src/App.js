import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard.js';
import Navbar from './components/Navbar';
import { CssBaseline, Container } from '@mui/material';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    const handleLogin = (userRole) => {
        setIsAuthenticated(true);
        setRole(userRole);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setRole('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <CssBaseline />
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} role={role} />
            <Container>
                <Routes>
                    <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    {isAuthenticated && role === 'HR' && <Route path="/admin" element={<AdminDashboard />} />}
                    {isAuthenticated && role === 'Employee' && <Route path="/employee" element={<Dashboard />} />}
                    <Route path="/" element={<div>Welcome to the Employee Management System</div>} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
