import React, {
  useState,
  useEffect,
  useCallback
} from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../api';

import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';


const AdminDashboard = () => {

  const navigate = useNavigate();

  const [
    resignationRequests,
    setResignationRequests
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState('');

  const fetchResignationRequests =
    useCallback(async () => {

      try {

        setLoading(true);

        const response =
          await api.get(
            '/api/admin/resignations'
          );

        console.log(
          'HR DASHBOARD DATA:',
          response.data
        );

        const requests =
          Array.isArray(
            response.data
          )
            ? response.data
            : response.data?.data || [];

        const sortedRequests =
  [...requests].sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );

setResignationRequests(
  sortedRequests
);

      } catch (err) {

        console.error(
          'DASHBOARD ERROR:',
          err.response?.data || err
        );

        setError(
          err.response?.data?.message ||
          'Failed to load dashboard data'
        );

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {

    fetchResignationRequests();

  }, [
    fetchResignationRequests
  ]);

  const totalRequests =
    resignationRequests.length;


  const pendingRequests =
    resignationRequests.filter(
      (request) =>
        request.status
          ?.toLowerCase() ===
        'pending'
    ).length;


  const approvedRequests =
    resignationRequests.filter(
      (request) =>
        request.status
          ?.toLowerCase() ===
        'approved'
    ).length;


  const completedInterviews =
    resignationRequests.filter(
      (request) =>
        request.exitInterviewStatus
          ?.toLowerCase() ===
        'completed'
    ).length;


  const pendingInterviews =
    resignationRequests.filter(
      (request) => {

        const isApproved =
          request.status
            ?.toLowerCase() ===
          'approved';

        const isNotCompleted =
          request.exitInterviewStatus
            ?.toLowerCase() !==
          'completed';

        return (
          isApproved &&
          isNotCompleted
        );

      }
    ).length;

  const getStatusColor =
    (status) => {

      const currentStatus =
        status?.toLowerCase();

      if (
        currentStatus ===
        'approved'
      ) {
        return 'success';
      }

      if (
        currentStatus ===
        'rejected'
      ) {
        return 'error';
      }

      return 'warning';

    };

  const formatDate =
    (date) => {

      if (!date) {
        return 'Not set';
      }

      const formattedDate =
        new Date(date);

      if (
        Number.isNaN(
          formattedDate.getTime()
        )
      ) {
        return 'Not set';
      }

      return (
        formattedDate
          .toLocaleDateString(
            'en-GB'
          )
      );

    };

  if (loading) {

    return (

      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent:
            'center',
          alignItems:
            'center'
        }}
      >

        <CircularProgress />

      </Box>

    );

  }

  return (

    <Container
      maxWidth="xl"
      sx={{
        mt: 0,
        mb: 5,
        pt:0
      }}
    >

      <Box
        sx={{
          mb: 4
        }}
      >

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color:
              '#1f2937',
            mb: 1
          }}
        >

          HR Dashboard

        </Typography>

        <Typography
          variant="body1"
          sx={{
            color:
              '#6b7280'
          }}
        >

          Monitor employee
          resignation requests and
          exit interview progress.

        </Typography>

      </Box>

      <Grid
        container
        spacing={3}
        sx={{
          mb: 4
        }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
        >

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border:
                '1px solid #e5e7eb',
              borderTop:
                '4px solid #2563eb'
            }}
          >

            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mb: 1
              }}
            >

              Total Requests

            </Typography>


            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color:
                  '#1f2937'
              }}
            >

              {totalRequests}

            </Typography>

          </Paper>

        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
        >

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border:
                '1px solid #e5e7eb',
              borderTop:
                '4px solid #f59e0b'
            }}
          >

            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mb: 1
              }}
            >

              Pending Requests

            </Typography>


            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color:
                  '#d97706'
              }}
            >

              {pendingRequests}

            </Typography>

          </Paper>

        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
        >

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border:
                '1px solid #e5e7eb',
              borderTop:
                '4px solid #16a34a'
            }}
          >

            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mb: 1
              }}
            >

              Approved

            </Typography>


            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color:
                  '#15803d'
              }}
            >
              {approvedRequests}

            </Typography>

          </Paper>

        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
        >

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border:
                '1px solid #e5e7eb',
              borderTop:
                '4px solid #7c3aed'
            }}
          >

            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mb: 1
              }}
            >

              Interviews Completed

            </Typography>


            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color:
                  '#6d28d9'
              }}
            >

              {completedInterviews}

            </Typography>

          </Paper>

        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
        >

          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: 3,
              border:
                '1px solid #e5e7eb',
              borderTop:
                '4px solid #ea580c'
            }}
          >

            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mb: 1
              }}
            >

              Interviews Pending

            </Typography>


            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color:
                  '#c2410c'
              }}
            >

              {pendingInterviews}

            </Typography>

          </Paper>

        </Grid>

      </Grid>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow:
            'hidden',
          border:
            '1px solid #e5e7eb',
          boxShadow:
            '0 8px 24px rgba(15, 23, 42, 0.08)'
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2.2,
            display:
              'flex',
            justifyContent:
              'space-between',
            alignItems:
              'center',
            borderBottom:
              '1px solid #e5e7eb',
            backgroundColor:
              '#f8fafc'
          }}
        >

          <Box>

            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                color:
                  '#1f2937'
              }}
            >

              Recent Exit Requests

            </Typography>


            <Typography
              variant="body2"
              sx={{
                color:
                  '#6b7280',
                mt: 0.3
              }}
            >

              Latest employee
              resignation activity

            </Typography>

          </Box>
          <Button
            variant="contained"
            onClick={() =>
              navigate(
                '/admin/manage'
              )
            }
            sx={{
              textTransform:
                'none',
              fontWeight:
                700,
              borderRadius:
                2,
              backgroundColor:
                '#2563eb',

              '&:hover': {
                backgroundColor:
                  '#1d4ed8'
              }
            }}
          >

            View All Requests

          </Button>

        </Box>

        {resignationRequests
          .length === 0 ? (

          <Box
            sx={{
              py: 7,
              textAlign:
                'center'
            }}
          >

            <Typography
              color=
                "text.secondary"
            >

              No resignation
              requests found

            </Typography>

          </Box>

        ) : (

          <TableContainer>

            <Table>

              <TableHead>

                <TableRow
                  sx={{
                    backgroundColor:
                      '#eef2f7'
                  }}
                >

                  <TableCell
                    sx={{
                      fontWeight:
                        700
                    }}
                  >

                    Employee

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      fontWeight:
                        700
                    }}
                  >

                    Requested LWD

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      fontWeight:
                        700
                    }}
                  >

                    Resignation

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      fontWeight:
                        700
                    }}
                  >

                    Exit Interview

                  </TableCell>

                </TableRow>

              </TableHead>


              <TableBody>

                {resignationRequests
                  .slice(0, 5)
                  .map(
                    (request) => (

                    <TableRow
                      key={
                        request._id
                      }
                      hover
                    >

                      <TableCell>

                        <Typography
                          fontWeight={
                            650
                          }
                        >

                          {
                            request
                              .employeeId
                              ?.username ||
                            request
                              .username ||
                            'Unknown Employee'
                          }

                        </Typography>


                        <Typography
                          variant=
                            "caption"
                          sx={{
                            color:
                              '#9ca3af'
                          }}
                        >

                          Employee

                        </Typography>

                      </TableCell>


                      <TableCell
                        align="center"
                      >

                        {
                          formatDate(
                            request.lwd ||
                            request
                              .lastWorkingDay
                          )
                        }

                      </TableCell>


                      <TableCell
                        align="center"
                      >

                        <Chip
                          label={
                            request
                              .status
                              ?.toUpperCase() ||
                            'PENDING'
                          }
                          color={
                            getStatusColor(
                              request
                                .status
                            )
                          }
                          size="small"
                          sx={{
                            minWidth:
                              100,
                            fontWeight:
                              700
                          }}
                        />

                      </TableCell>


                      <TableCell
                        align="center"
                      >

                        <Chip
                          label={
                            request
                              .exitInterviewStatus
                              ?.toUpperCase() ||
                            'NOT SUBMITTED'
                          }
                          color={
                            request
                              .exitInterviewStatus
                              ?.toLowerCase() ===
                            'completed'
                              ? 'success'
                              : 'warning'
                          }
                          size="small"
                          sx={{
                            minWidth:
                              120,
                            fontWeight:
                              700
                          }}
                        />

                      </TableCell>

                    </TableRow>

                  )
                )}

              </TableBody>

            </Table>

          </TableContainer>

        )}

      </Paper>
      <Snackbar
        open={!!error}
        autoHideDuration={
          3500
        }
        onClose={() =>
          setError('')
        }
        anchorOrigin={{
          vertical:
            'top',
          horizontal:
            'center'
        }}
      >

        <Alert
          severity="error"
          variant="filled"
          onClose={() =>
            setError('')
          }
        >

          {error}

        </Alert>

      </Snackbar>

    </Container>

  );

};


export default AdminDashboard;