import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import Dashboard from './components/Dashboard';
import ResignationForm from './components/ResignationForm';
import ExitInterviewForm from './components/ExitInterviewForm';
import ManageRequests from './components/ManageRequests';
import Layout from './components/Layout';

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true); // ✅ prevent early redirect

  // ✅ LOAD AUTH (FIXED)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole.toUpperCase());
    }

    setLoading(false); // ✅ important
  }, []);

  // ✅ LOGIN HANDLER (FIXED)
  const handleLogin = (userRole) => {
    const normalizedRole = userRole?.toUpperCase();

    setIsAuthenticated(true);
    setRole(normalizedRole);

    // ✅ DIRECT NAVIGATION (NO TIMEOUT)
    if (normalizedRole === 'HR') {
      navigate('/admin');
    } else {
      navigate('/employee');
    }
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole('');
    navigate('/login');
  };

  // ✅ PREVENT ROUTE FLICKER
  if (loading) return null;

  return (
    <>
      <CssBaseline />

      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginForm handleLogin={handleLogin} />
            ) : (
              <Navigate to={role === 'HR' ? '/admin' : '/employee'} />
            )
          }
        />

        <Route path="/register" element={<RegistrationForm />} />

        {/* EMPLOYEE */}
        <Route
          path="/employee"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout role={role} handleLogout={handleLogout}>
                <Dashboard />
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route
          path="/employee/resign"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout role={role} handleLogout={handleLogout}>
                <ResignationForm />
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route
          path="/employee/interview"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout role={role} handleLogout={handleLogout}>
                <ExitInterviewForm />
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        {/* HR / ADMIN */}
        <Route
          path="/admin"
          element={
            isAuthenticated && role === 'HR' ? (
              <Layout role={role} handleLogout={handleLogout}>
                <AdminDashboard />
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        <Route
          path="/admin/manage"
          element={
            isAuthenticated && role === 'HR' ? (
              <Layout role={role} handleLogout={handleLogout}>
                <ManageRequests />
              </Layout>
            ) : <Navigate to="/login" />
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </>
  );
}

export default App;
