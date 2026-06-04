import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Chip
} from '@mui/material';
import ResignationForm from './ResignationForm';
import ExitInterviewForm from './ExitInterviewForm';

function Dashboard() {
  const username = localStorage.getItem('username') || 'Employee';

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedStatus = localStorage.getItem('resignationStatus');

    if (savedStatus) {
      setStatus(savedStatus);
    } else {
      setStatus('none');
    }

    setLoading(false);
  }, []);

  // 🎨 Status Color
  const getStatusColor = () => {
    if (status === 'approved') return 'success';
    if (status === 'pending') return 'warning';
    if (status === 'rejected') return 'error';
    return 'default';
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>

      {/* HEADER */}
      <Box mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Welcome, {username}
        </Typography>

        <Typography color="text.secondary">
          Employee Dashboard
        </Typography>
      </Box>

      {/* STATUS CARD */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6">Resignation Status</Typography>

        <Box mt={2}>
          <Chip
            label={status?.toUpperCase()}
            color={getStatusColor()}
          />
        </Box>
      </Paper>

      {/* MAIN CONTENT */}
      <Grid container spacing={3}>

        {/* NONE → SHOW FORM */}
        {status === 'none' && (
          <Grid item xs={12}>
            <ResignationForm setStatus={setStatus} />
          </Grid>
        )}

        {/* PENDING */}
        {status === 'pending' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography color="warning.main">
                Your resignation is under review ⏳
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* APPROVED */}
        {status === 'approved' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography color="success.main" mb={2}>
                Resignation Approved ✅
              </Typography>

              <ExitInterviewForm />
            </Paper>
          </Grid>
        )}

        {/* REJECTED */}
        {status === 'rejected' && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography color="error.main">
                Resignation Rejected ❌
              </Typography>
            </Paper>
          </Grid>
        )}

      </Grid>

    </Container>
  );
}

export default Dashboard;
