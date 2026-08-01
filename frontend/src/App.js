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
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (token && storedRole) {
      setIsAuthenticated(true);
      setRole(storedRole.toUpperCase());
    }

    setLoading(false);
  }, []);


  const handleLogin = (userRole) => {
    const normalizedRole = userRole?.toUpperCase();

    setIsAuthenticated(true);
    setRole(normalizedRole);

    
    if (normalizedRole === 'ADMIN') {
      navigate('/admin');
    } else if (normalizedRole === 'EMPLOYEE') {
      navigate('/employee');
    } else {
      localStorage.clear();
      setIsAuthenticated(false);
      setRole('');
      navigate('/login');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole('');
    navigate('/login');
  };

  if (loading) return null;

  return (
    <>
      <CssBaseline />

      <Routes>

        <Route
          path="/"
          element={
            <Navigate
              to={
                isAuthenticated
                  ? role === 'ADMIN'
                    ? '/admin'
                    : '/employee'
                  : '/login'
              }
              replace
            />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginForm handleLogin={handleLogin} />
            ) : (
              <Navigate
                to={role === 'ADMIN' ? '/admin' : '/employee'}
                replace
              />
            )
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={<RegistrationForm />}
        />

        {/* Employee dashboard */}
        <Route
          path="/employee"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout
                role={role}
                handleLogout={handleLogout}
              >
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Employee resignation */}
        <Route
          path="/employee/resign"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout
                role={role}
                handleLogout={handleLogout}
              >
                <ResignationForm />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Employee exit interview */}
        <Route
          path="/employee/interview"
          element={
            isAuthenticated && role === 'EMPLOYEE' ? (
              <Layout
                role={role}
                handleLogout={handleLogout}
              >
                <ExitInterviewForm />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            isAuthenticated && role === 'ADMIN' ? (
              <Layout
                role={role}
                handleLogout={handleLogout}
              >
                <AdminDashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin manage requests */}
        <Route
          path="/admin/manage"
          element={
            isAuthenticated && role === 'ADMIN' ? (
              <Layout
                role={role}
                handleLogout={handleLogout}
              >
                <ManageRequests />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </>
  );
}

export default App;