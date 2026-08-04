import React from 'react';

import {
  Box
} from '@mui/material';

import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = ({
  children,
  role,
  handleLogout,
  hideSidebar = false
}) => {

  const normalizedRole =
    role?.toUpperCase();

  const showSidebar =
    normalizedRole === 'EMPLOYEE' &&
    !hideSidebar;

  return (

    <Box
      sx={{
        display: 'flex',

        minHeight: '100vh',

        backgroundColor:
          '#f3f6fa'
      }}
    >

      {showSidebar && (
        <Sidebar
          role={role}
        />
      )}

      <Box
        sx={{
          flexGrow: 1,

          minWidth: 0,

          width: '100%',

          display: 'flex',

          flexDirection:
            'column'
        }}
      >
        <Navbar
          role={role}
          handleLogout={
            handleLogout
          }
          isAuthenticated
        />
        <Box
          component="main"

          sx={{
            flexGrow: 1,

            width: '100%',

            minHeight:
              'calc(100vh - 70px)',

            boxSizing:
              'border-box',

            px: {
              xs: 2,
              sm: 3,
              md: 5
            },

            pt: {
              xs: 1,
              md: 1.5
            },

            pb: {
              xs: 3,
              md: 4
            },

            backgroundColor:
              '#f3f6fa'
          }}
        >

          {children}

        </Box>

      </Box>

    </Box>

  );
};

export default Layout;