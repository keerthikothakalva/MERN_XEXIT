import React, {
  useEffect,
  useState
} from 'react';

import api from '../api';

import {
  useNavigate
} from 'react-router-dom';

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Chip,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material';


function ManageRequests() {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedLwd, setSelectedLwd] =
    useState({});

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');
  const [searchTerm, setSearchTerm] =
  useState('');

const [statusFilter, setStatusFilter] =
  useState('all');
  const navigate =
    useNavigate();

  const fetchData = async () => {

    try {

      setLoading(true);

      const response =
        await api.get(
          '/api/admin/resignations'
        );

      const resignationList =
        Array.isArray(
          response.data
        )
          ? response.data
          : response.data?.data || [];

      setData(
        resignationList
      );

    } catch (err) {

      console.error(
        'FETCH ERROR:',
        err.response?.data || err
      );

      setError(
        err.response?.data?.message ||
        'Failed to load resignation requests'
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchData();

  }, []);

  const handleAction = async (
    resignationId,
    approved
  ) => {

    const selectedDate =
      selectedLwd[resignationId];

    if (
      approved &&
      !selectedDate
    ) {
      setError(
        'Please select the exit date before approving'
      );
      return;
    }
    try {
      await api.put(
        '/api/admin/conclude_resignation',
        {
          resignationId,
          approved,
          exitDate:
            approved
              ? selectedDate
              : null
        }
      );


      setMessage(
        approved
          ? 'Resignation approved successfully'
          : 'Resignation rejected successfully'
      );
      await fetchData();
      setSelectedLwd(
        {}
      );
    } catch (err) {
      console.error(
        'UPDATE ERROR:',
        err.response?.data || err
      );
      setError(
        err.response
          ?.data
          ?.message ||

        'Unable to update resignation'
      );
    }
  };
  const getResignationColor = (
    status
  ) => {

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

  const getExitInterviewColor = (
    status
  ) => {
    const currentStatus =
      status?.toLowerCase();
    if (
      currentStatus ===
      'completed'
    ) {
      return 'success';
    }
    return 'warning';
  };

  const formatDate = (
    date
  ) => {

    if (!date) {

      return '—';

    }

    const convertedDate =
      new Date(date);

    if (
      Number.isNaN(
        convertedDate.getTime()
      )
    ) {

      return date;

    }

    return convertedDate
      .toLocaleDateString(
        'en-GB'
      );

  };

  const formatDateForInput = (
    date
  ) => {
    if (!date) {
      return '';
    }
    const convertedDate =
      new Date(date);
    if (
      Number.isNaN(
        convertedDate.getTime()
      )
    ) {
      return '';
    }
    return convertedDate
      .toISOString()
      .split('T')[0];
  };

const filteredData = data.filter(
  (item) => {

    const employeeName =
      item.employeeId
        ?.username
        ?.toLowerCase() || '';

    const resignationStatus =
      item.status
        ?.toLowerCase() || 'pending';

    const matchesSearch =
      employeeName.includes(
        searchTerm.toLowerCase()
      );

    const matchesStatus =
      statusFilter === 'all' ||
      resignationStatus ===
        statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  }
);

  if (loading) {
    return (
      <Box
        sx={{

          minHeight:
            '60vh',

          display:
            'flex',

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

      maxWidth={false}

      disableGutters

      sx={{

        mt: 0,

        pt: 0,

        mb: 5,

        px: {

          xs: 2,

          sm: 3,

          md: 4

        },

        width:
          '100%',

        boxSizing:
          'border-box'

      }}

    >
      <Box
        sx={{
          mb: 4
        }}
      >
        <Button

          variant="outlined"

          onClick={() =>
            navigate('/admin')
          }

          sx={{

            mb: 2.5,

            px: 2,

            py: 0.9,

            borderRadius: 2,

            textTransform:
              'none',

            fontWeight:
              700,

            color:
              '#2563eb',

            borderColor:
              '#bfdbfe',

            '&:hover': {

              backgroundColor:
                '#eff6ff',

              borderColor:
                '#2563eb'
            }

          }}>

          Back to Dashboard
        </Button>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color:
              '#1f2937',
            mb: 1
          }}>

          Manage Requests
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color:
              '#6b7280'
          }}>

          Review resignation requests
          and monitor employee
          exit interviews.

        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          width:
            '100%',
          borderRadius:
            4,
          overflow:
            'hidden',
          border:
            '1px solid #e5e7eb',
          boxShadow:
            '0 8px 24px rgba(15, 23, 42, 0.08)'
        }}>
        <Box
          sx={{
            px: 3,
            py: 2.2,
            borderBottom:
              '1px solid #e5e7eb',
            backgroundColor:
              '#f8fafc'
          }}>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              color:
                '#1f2937'
            }} >

            Employee Exit Requests
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                '#6b7280',
              mt: 0.4
            }}>

            Total requests:
            {' '}
            {data.length}

          </Typography>

        </Box>
      
<Box
  sx={{
    px: 3,
    py: 2,
    display:
      'flex',
    gap:
      2,
    flexWrap:
      'wrap',
    borderBottom:
      '1px solid #e5e7eb',
    backgroundColor:
      '#ffffff'
  }}>

  <TextField
    label="Search employee"
    placeholder="Enter employee name"
    size="small"
    value={
      searchTerm
    }
    onChange={
      (event) =>
        setSearchTerm(
          event.target.value
        )
    }

    sx={{
      minWidth:
        240
    }}/>


  <TextField

    select

    label="Filter by status"

    size="small"

    value={
      statusFilter
    }
    onChange={
      (event) =>

        setStatusFilter(
          event.target.value
        )
    }
    sx={{
      minWidth:
        190
    }}>

    <MenuItem
      value="all">
      All Statuses
    </MenuItem>
    <MenuItem
      value="pending"
    >
      Pending
    </MenuItem>
    <MenuItem
      value="approved"
    >
      Approved
    </MenuItem>
    <MenuItem
      value="rejected">
      Rejected
    </MenuItem>
  </TextField>
</Box>

        {filteredData.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign:
                'center'
            }}>

            <Typography
              variant="h6"
              color="text.secondary">
              No resignation
              requests found

            </Typography>

          </Box>

        ) : (

          <TableContainer
            sx={{
              width:
                '100%',
              overflowX:
                'auto'
            }}>

            <Table
              size="small"
              sx={{
                width:
                  '100%',
                minWidth:
                  1050,
                tableLayout:
                  'fixed'
              }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor:
                      '#eef2f7'
                  }}>

                  <TableCell
                    sx={{
                      width:
                        '12%',
                      fontWeight:
                        700,
                      color:
                        '#374151',
                      py:
                        2
                    }}>

                    Employee

                  </TableCell>

                  <TableCell
                    sx={{
                      width:
                        '17%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Reason

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      width:
                        '11%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Requested LWD

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      width:
                        '13%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Resignation Status

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      width:
                        '14%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Exit Interview

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      width:
                        '15%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Set Exit Date

                  </TableCell>


                  <TableCell
                    align="center"
                    sx={{
                      width:
                        '18%',
                      fontWeight:
                        700,
                      color:
                        '#374151'
                    }}>

                    Action

                  </TableCell>

                </TableRow>

              </TableHead>
              <TableBody>
                {filteredData.map(
                  (item) => {
                    const resignationStatus =
                      item.status
                        ?.toLowerCase() ||
                      'pending';
                    const isApproved =
                      resignationStatus ===
                      'approved';
                    const isRejected =
                      resignationStatus ===
                     'rejected';
                    return (
                      <TableRow
                        key={
                          item._id
                        }
                        hover
                        sx={{
                          '&:last-child td': {
                            borderBottom:
                              0
                          },

                          '&:hover': {
                            backgroundColor:
                              '#f8fafc'

                          }
                        }}>
                        <TableCell
                          sx={{
                            py: 2.2
                          }}>

                          <Typography
                            fontWeight={700}
                            sx={{
                              color:
                                '#1f2937'
                            }}>

                            {
                              item.employeeId
                                ?.username ||
                              'Unknown Employee'
                            }

                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{
                              color:
                                '#9ca3af'
                            }}>
                            Employee

                          </Typography>

                        </TableCell>
                        <TableCell>

                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                '#4b5563',
                              overflowWrap:
                                'break-word'
                            }}>

                            {
                              item.reason ||
                              '—'
                            }

                          </Typography>

                        </TableCell>
                        <TableCell
                          align="center">
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            sx={{
                              color:
                                '#374151',
                              whiteSpace:
                                'nowrap'
                            }}>

                            {
                              formatDate(
                                item.lwd
                              )
                            }

                          </Typography>

                        </TableCell>
                        <TableCell
                          align="center">
                          <Chip

                            label={
                              resignationStatus
                                .toUpperCase()

                            }

                            color={

                              getResignationColor(
                                resignationStatus

                              )}
                            size="small"
                            sx={{
                              minWidth:
                                95,
                              fontWeight:
                                700
                            }}/>
                        </TableCell>
                        <TableCell
                          align="center">
                          <Chip
                            label={
                              item
                                .exitInterviewStatus
                                ?.toUpperCase() ||
                              'NOT SUBMITTED'
                            }
                            color={
                              getExitInterviewColor(
                                item
                                  .exitInterviewStatus
                              )
                            }
                            size="small"
                            sx={{
                              minWidth:
                                110,
                              fontWeight:
                                700
                            }}/>
                        </TableCell>

                        <TableCell
                          align="center">

                          <TextField
                            type="date"
                            size="small"
                            value={
                              selectedLwd[
                                item._id
                              ] ||

                              formatDateForInput(
                                item.exitDate
                              )
                            }
                            disabled={
                              isApproved ||
                              isRejected
                            }
                            onChange={
                              (event) =>
                                setSelectedLwd({
                                  ...selectedLwd,
                                  [item._id]:
                                    event.target
                                      .value
                                })}
                            sx={{
                              width:
                                '100%',
                              maxWidth:
                                145,
                              '& .MuiOutlinedInput-root': {
                                height:
                                  38,
                                borderRadius:
                                  2
                              }}}/>

                        </TableCell>

                        <TableCell
                          align="center">
                          <Box
                            sx={{
                              display:
                                'flex',
                              justifyContent:
                                'center',
                              gap:
                                0.8
                            }}>
                            <Button
                              variant="contained"
                              color="success"
                              disabled={
                                isApproved ||
                                isRejected
                              }
                              onClick={() =>
                                handleAction(
                                  item._id,
                                  true
                                )}

                              sx={{
                                minWidth:76,
                                height:36,
                                borderRadius:2,
                                textTransform:'none',
                                fontWeight:700,
                                boxShadow:'none'
                              }}>

                              Approve
                            </Button>

                            <Button
                              variant="contained"
                              color="error"
                              disabled={
                                isApproved ||
                                isRejected
                              }
                              onClick={() =>
                                handleAction(
                                  item._id,
                                  false
                                )
                              }
                              sx={{
                                minWidth:
                                  76,
                                height:
                                  36,
                                borderRadius:
                                  2,
                                textTransform:
                                  'none',
                                fontWeight:
                                  700,
                                boxShadow:
                                  'none'
                              }}
                            >
                              Reject
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Paper>
      <Snackbar

        open={
          !!message
        }
        autoHideDuration={
          3000
        }
        onClose={() =>
          setMessage('')
        }
        anchorOrigin={{
          vertical:
            'top',
          horizontal:
            'center'
        }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() =>
            setMessage('')
          }
        >
          {message}

        </Alert>

      </Snackbar>

      <Snackbar
        open={
          !!error
        }
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
}


export default ManageRequests;