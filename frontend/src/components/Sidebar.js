import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('username') === 'admin' ? 'HR' : 'Employee';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing: 'border-box',
          background: '#1f2937',
          color: 'white'
        }
      }}
    >
      <List>

        <ListItem button onClick={() => navigate(role === 'HR' ? '/admin' : '/employee')}>
          <ListItemText primary="Dashboard" />
        </ListItem>

        {role === 'Employee' && (
          <>
            <ListItem button onClick={() => navigate('/employee/resign')}>
              <ListItemText primary="Resign" />
            </ListItem>

            <ListItem button onClick={() => navigate('/employee/interview')}>
              <ListItemText primary="Exit Interview" />
            </ListItem>
          </>
        )}

        {role === 'HR' && (
          <ListItem button onClick={() => navigate('/admin/manage')}>
            <ListItemText primary="Manage Requests" />
          </ListItem>
        )}

      </List>
    </Drawer>
  );
};

export default Sidebar;