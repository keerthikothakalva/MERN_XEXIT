import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Button, Typography, Container } from '@mui/material';

function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <Container>
            <Typography variant="h4">Welcome {user.username}</Typography>
            <Typography variant="subtitle1">Role: {user.role}</Typography>
            <Button onClick={logout} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
                Logout
            </Button>
        </Container>
    );
}

export default Dashboard;
