import React, { useState } from 'react';
import api from '../api';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value.trim() // trim spaces
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/api/auth/register', {
                username: formData.username,
                password: formData.password,
                email: formData.email
            });

            alert('Registration successful!');
        } catch (error) {
            console.error(error.response?.data);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained">
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default RegistrationForm;
