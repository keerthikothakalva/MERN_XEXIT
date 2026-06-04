import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Navbar({ role, handleLogout }) {
  const username = localStorage.getItem('username');

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography variant="h6">
          Exit Management System
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {username} ({role})
          </Typography>

          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
