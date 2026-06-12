import React, { useEffect, useState } from 'react';
import api from '../api';
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
  Alert
} from '@mui/material';

function ManageRequests() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLwd, setSelectedLwd] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  //  FETCH ALL RESIGNATIONS
  const fetchData = async () => {
  try {
    setLoading(true);

    const res = await api.get('/api/admin/resignations');

    const list = Array.isArray(res.data)
      ? res.data
      : res.data?.data || [];

    setData(list);

  } catch (err) {
    console.error(err);
    setError('Failed to load requests');
  } finally {
    setLoading(false);
  }
};

  // APPROVE / REJECT
  const handleAction = async (id, status) => {
    const exitDate = selectedLwd[id];

    if (!exitDate) {
      setError('Please select exit date');
      return;
    }

    try {
      await api.put('/admin/conclude_resignation', {
        id,
        status: status.toLowerCase(),
        lwd: exitDate 
      });

      setMessage(`Request ${status} successfully`);

      // 
      fetchData();

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Update failed');
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
        Manage Requests
      </Typography>

      <Typography color="text.secondary" mb={3}>
        Review and process employee resignations
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
        <Table>

          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              <TableCell><b>Employee</b></TableCell>
              <TableCell><b>Reason</b></TableCell>
              <TableCell><b>Requested LWD</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Exit Date</b></TableCell>
              <TableCell><b>Set Exit Date</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id} hover>

                <TableCell>{item.username}</TableCell>

                <TableCell>
                  {item.reason || '—'}
                </TableCell>

                <TableCell>
                  {new Date(item.lastWorkingDay || item.lwd).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Chip
                    label={item.status?.toUpperCase()}
                    color={getStatusColor(item.status)}
                  />
                </TableCell>

                <TableCell>
                  {item.exitDate
                    ? new Date(item.exitDate).toLocaleDateString()
                    : 'Not set'}
                </TableCell>

                <TableCell>
                  <TextField
                    type="date"
                    size="small"
                    value={selectedLwd[item._id] || ''}
                    onChange={(e) =>
                      setSelectedLwd({
                        ...selectedLwd,
                        [item._id]: e.target.value
                      })
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                    disabled={item.status?.toLowerCase() === 'approved'}
                    onClick={() => handleAction(item._id, 'Approved')}
                  >
                    Approve
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    disabled={item.status?.toLowerCase() === 'rejected'}
                    onClick={() => handleAction(item._id, 'Rejected')}
                  >
                    Reject
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* SUCCESS */}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>

      
      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError('')}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>

    </Container>
  );
}

export default ManageRequests;