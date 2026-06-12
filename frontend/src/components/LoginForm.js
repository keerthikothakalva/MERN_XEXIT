import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post('/api/auth/login', {
  username,
  password
});
console.log("LOGIN RESPONSE:", response.data);

const token = response.data.token;
const role = response.data.role;

console.log("TOKEN:", token);

if (!token) {
  setError("Login failed: No token received from server");
  return;
}

localStorage.setItem('token', token);
localStorage.setItem('username', username);
localStorage.setItem('role', role?.toUpperCase());

handleLogin(role);

  } catch (err) {
    console.error(err);
    setError('Login failed');
  }
};

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: 'white'
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/register')}
          >
            New user? Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default LoginForm;
