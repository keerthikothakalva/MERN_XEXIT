import React, {
  useEffect,
  useState
} from 'react';

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
  Box
} from '@mui/material';

import {
  useNavigate
} from 'react-router-dom';

import api from '../api';


const Sidebar = () => {

  const navigate = useNavigate();

  const username =
    localStorage.getItem('username');

  const role =
    username === 'admin'
      ? 'HR'
      : 'Employee';

  const [
    resignationStatus,
    setResignationStatus
  ] = useState(null);


  useEffect(() => {

    const getEmployeeStatus =
      async () => {

        if (role === 'HR') {
          return;
        }

        try {

          const response =
            await api.get(
              '/api/user/resignation'
            );
          const resignation =
            response.data?.data;
          if (resignation) {
            setResignationStatus(
              resignation.status
                ?.toLowerCase()
            );
          } else {
            setResignationStatus(
              'none'
            );
          }
        } catch (error) {
          console.error(
            'SIDEBAR STATUS ERROR:',
            error.response?.data ||
            error
          );
          setResignationStatus(
            'none'
          );
        }
      };

    getEmployeeStatus();

  }, [role]);


  return (

    <Drawer

      variant="permanent"

      sx={{
        width: 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 220,
          boxSizing:'border-box',
          backgroundColor:'#1f2937',
          color:'#ffffff',
          borderRight:'none'
        }
      }}>

      <Box
        sx={{
          px: 3,
          py: 3
        }}>

        <Typography
          variant="h6"

          fontWeight={700}>
            XEXIT
        </Typography>


        <Typography

          variant="caption"
          sx={{
            color:
              '#9ca3af'

          }}>

          {role} Portal

        </Typography>

      </Box>

      <Divider
        sx={{
          borderColor:
            '#374151'
        }}/>
      <List
        sx={{
          px: 1.5,
          py: 2
        }}>
        <ListItemButton

          onClick={() =>
            navigate(
              role === 'HR'
                ? '/admin'
                : '/employee'

            )}

          sx={{
            borderRadius: 2,
            mb: 1,
            '&:hover': {
              backgroundColor:
                '#374151'

            }

          }}>

          <ListItemText

            primary="Dashboard"/>

        </ListItemButton>

        {role === 'Employee' && (

          <>

            {resignationStatus ===
              'none' && (

              <ListItemButton

                onClick={() =>

                  navigate(
                    '/employee/resign'
                  )

                }

                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor:
                      '#374151'

                  }

                }}>

                <ListItemText

                  primary="New Resignation"/>

              </ListItemButton>

            )}

          </>

        )}

        {role === 'HR' && (

          <ListItemButton

            onClick={() =>

              navigate(
                '/admin/manage'
              )

            }

            sx={{

              borderRadius: 2,

              '&:hover': {

                backgroundColor:
                  '#374151'

              }

            }}>

            <ListItemText

              primary="Manage Requests"

            />

          </ListItemButton>

        )}

      </List>

    </Drawer>

  );

};


export default Sidebar;