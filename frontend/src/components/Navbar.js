import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, role, handleLogout }) {
    return (
        <AppBar position="static">
            <Toolbar>
                <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Title */}
                    <Typography variant="h6">
                        Employee Management System
                    </Typography>

                    {/* Buttons */}
                    <Box>
                        {!isAuthenticated ? (
                            <>
                                <Button color="inherit" component={Link} to="/login" sx={{ marginRight: 2 }}>
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register">
                                    Register
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to={role === 'HR' ? '/admin' : '/employee'}
                                    sx={{ marginRight: 2 }}
                                >
                                    Dashboard
                                </Button>
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
