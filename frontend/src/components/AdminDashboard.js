import React, { useState, useEffect, useCallback } from 'react';
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
  TextField,
  Chip,
  Box,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

const AdminDashboard = () => {
  const [resignationRequests, setResignationRequests] = useState([]);
  const [selectedLwd, setSelectedLwd] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // FETCH DATA
  const fetchResignationRequests = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get('/api/admin/resignations');

    
    console.log(
      'RESIGNATIONS RESPONSE:',
      response.data
    );


      setResignationRequests(
        Array.isArray(response.data)
          ? response.data
          : response.data?.data || []
      );

    } catch (err) {
      console.error(err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED useEffect
  useEffect(() => {
    fetchResignationRequests();
  }, [fetchResignationRequests]);

  // APPROVE / REJECT
  const handleDecision = async (id, approved) => {
  try {
    const lwd = selectedLwd[id];

    if (!lwd) {
      setError('Please select exit date');
      return;
    }

    await api.put('/api/admin/conclude_resignation', {
      resignationId: id,
      approved,
      lwd
    });

    setMessage(
      approved
        ? 'Resignation approved successfully'
        : 'Resignation rejected successfully'
    );

    fetchResignationRequests();

  } catch (err) {
    console.error('UPDATE ERROR:', err.response?.data || err);

    setError(
      err.response?.data?.message ||
      'Update failed'
    );
  }
};

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'approved') return 'success';
    if (s === 'rejected') return 'error';
    return 'warning';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        HR Dashboard
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Manage employee resignation requests
      </Typography>

      {resignationRequests.length === 0 && (
        <Typography>No requests found</Typography>
      )}

      {resignationRequests.length > 0 && (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>

            <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
              <TableRow>
                <TableCell><b>Employee</b></TableCell>
                <TableCell><b>Requested LWD</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Exit Date</b></TableCell>
                <TableCell><b>Set Exit Date</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {resignationRequests.map((req) => (
                <TableRow key={req._id} hover>

                  <TableCell>{req.username}</TableCell>

                  <TableCell>
                    {new Date(req.lastWorkingDay || req.lwd).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={req.status}
                      color={getStatusColor(req.status)}
                    />
                  </TableCell>

                  <TableCell>
                    {req.exitDate
                      ? new Date(req.exitDate).toLocaleDateString()
                      : "Not set"}
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="date"
                      size="small"
                      value={selectedLwd[req._id] || ''}
                      onChange={(e) =>
                        setSelectedLwd({
                          ...selectedLwd,
                          [req._id]: e.target.value
                        })
                      }
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{ mr: 1 }}
                      disabled={req.status?.toLowerCase() === 'approved'}
                      onClick={() => handleDecision(req._id, true)}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      disabled={req.status?.toLowerCase() === 'rejected'}
                      onClick={() => handleDecision(req._id, false)}
                    >
                      Reject
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      )}

      {/* SUCCESS */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      {/* ERROR */}
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

    </Container>
  );
};

export default AdminDashboard;