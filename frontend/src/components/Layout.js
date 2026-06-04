import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({ children, role, handleLogout }) => {
  return (
    <Box display="flex">

      <Sidebar role={role} />

      <Box flexGrow={1}>
        <Navbar role={role} handleLogout={handleLogout} isAuthenticated />

        <Box p={3}>
          {children}
        </Box>
      </Box>

    </Box>
  );
};

export default Layout;
