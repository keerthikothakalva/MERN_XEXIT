import React, {
  useState,
  useEffect
} from 'react';

import {
  Typography,
  Container,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';

import api from '../api';

import ResignationForm from './ResignationForm';
import ExitInterviewForm from './ExitInterviewForm';


function Dashboard() {

  const username =
    localStorage.getItem('username') ||
    'Employee';


  const [status, setStatus] =
    useState(null);


  const [loading, setLoading] =
    useState(true);


  const [
    exitInterviewCompleted,
    setExitInterviewCompleted
  ] = useState(false);


  useEffect(() => {

    const fetchResignationStatus =
      async () => {

        try {

          const response =
            await api.get(
              '/api/user/resignation'
            );

          console.log(
            'MY RESIGNATION:',
            response.data
          );
          const resignation =
            response.data?.data;

          if (resignation) {
            setStatus(
              resignation.status
                ?.toLowerCase()
            );
            setExitInterviewCompleted(

              resignation
                .exitInterviewStatus
                ?.toLowerCase() ===
                'completed'
            );

          } else {

            setStatus('none');

            setExitInterviewCompleted(
              false
            );

          }

        } catch (err) {

          console.error(
            'STATUS ERROR:',
            err.response?.data || err
          );

          setStatus('none');

          setExitInterviewCompleted(
            false
          );
        } finally {
          setLoading(false);
        }
      };
    fetchResignationStatus();

  }, []);


  const getStatusColor = () => {

    if (
      status === 'approved'
    ) {
      return 'success';
    }
    if (
      status === 'pending'
    ) {
      return 'warning';
    }
    if (
      status === 'rejected'
    ) {
      return 'error';
    }
    return 'default';
  };


  if (loading) {

    return (

      <Box
        display="flex"
        justifyContent="center"
        mt={10}
      >

        <CircularProgress />

      </Box>

    );

  }


  return (

    <Container
      sx={{
        mt: 1
      }}
    >

      <Box
        mb={3}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
        >

          Welcome, {username}

        </Typography>


        <Typography
          color="text.secondary"
        >

          Employee Dashboard

        </Typography>

      </Box>

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3
        }}
      >

        <Typography
          variant="h6"
        >

          Resignation Status

        </Typography>


        <Box
          mt={2}
        >

          <Chip

            label={

              status === 'none'

                ? 'NOT SUBMITTED'

                : status
                    ?.toUpperCase()

            }

            color={
              getStatusColor()
            }

          />

        </Box>

      </Paper>


      <Grid
        container
        spacing={3}
      >

        {status === 'none' && (

          <Grid
            item
            xs={12}
          >

            <ResignationForm
              setStatus={
                setStatus
              }
            />

          </Grid>

        )}

        {status === 'pending' && (

          <Grid
            item
            xs={12}
          >

            <Paper
              sx={{
                p: 3
              }}
            >

              <Typography
                color="warning.main"
              >

                Your resignation is
                under review.

              </Typography>

            </Paper>

          </Grid>

        )}

        {status === 'approved' && (

          <Grid
            item
            xs={12}
          >

            <Paper
              sx={{
                p: 3,
                borderRadius: 3
              }}
            >

              <Typography
                color="success.main"
                mb={2}
              >

                Your resignation has
                been approved.

              </Typography>

              {!exitInterviewCompleted && (

                <ExitInterviewForm

                  onSubmitted={() =>

                    setExitInterviewCompleted(
                      true
                    )

                  }

                />

              )}

              {exitInterviewCompleted && (

                <Paper

                  elevation={0}

                  sx={{

                    p: 4,

                    mt: 2,

                    textAlign:
                      'center',

                    borderRadius: 3,

                    backgroundColor:
                      '#f0fdf4',

                    border:
                      '1px solid #bbf7d0'

                  }}

                >

                  <Typography

                    variant="h5"

                    color="success.main"

                    fontWeight="bold"

                    gutterBottom

                  >

                    Exit Interview Completed

                  </Typography>


                  <Typography

                    color="text.secondary"

                  >

                    Your exit interview has
                    already been submitted
                    successfully.

                  </Typography>

                </Paper>

              )}

            </Paper>

          </Grid>

        )}

{status === 'rejected' && (

  <Grid
    item
    xs={12}
  >

    <Paper
      elevation={0}

      sx={{

        maxWidth: 650,

        mx: 'auto',

        p: {
          xs: 3,
          sm: 5
        },

        textAlign: 'center',

        borderRadius: 4,

        backgroundColor:
          '#fff7f7',

        border:
          '1px solid #fecaca'

      }}

    >

      <Box

        sx={{

          width: 64,

          height: 64,

          mx: 'auto',

          mb: 2,

          display: 'flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          borderRadius:
            '50%',

          backgroundColor:
            '#fee2e2',

          color:
            '#dc2626',

          fontSize:
            '32px',

          fontWeight:
            'bold'

        }}

      >

        ✕

      </Box>

      <Typography

        variant="h5"

        fontWeight="bold"

        color="error.main"

        gutterBottom

      >

        Resignation Request Rejected

      </Typography>

      <Typography

        color="text.secondary"

        sx={{

          maxWidth:
            480,

          mx:
            'auto',

          lineHeight:
            1.8

        }}

      >

        Your resignation request
        was not approved.

        Please contact HR for
        further information.

      </Typography>

    </Paper>

  </Grid>

)}

      </Grid>

    </Container>

  );

}


export default Dashboard;