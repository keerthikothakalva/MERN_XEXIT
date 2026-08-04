import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import api from '../api';

function ResignationForm({ setStatus }) {
    const [lastWorkingDay, setLastWorkingDay] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!lastWorkingDay) {
            setError('Please select Last Working Day');
            setLoading(false);
            return;
        }

        try {
            
           await api.post('/api/user/resign', {
    lwd: lastWorkingDay,
    reason: reason.trim()
});

            setSuccessMessage('Resignation submitted successfully');

            setLastWorkingDay('');
            setReason('');

            localStorage.setItem('resignationStatus', 'pending');

            if (setStatus) {
                setStatus('pending');
            }

        } catch (err) {
            console.error("RESIGN ERROR:", err.response || err);

            if (err.response?.status === 400) {
                setError(err.response.data?.message || 'Invalid data');
            } else if (err.response?.status === 401) {
                setError('Unauthorized Please login again');
            } else {
                setError('Submission failed');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f9fafb'
            }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 3
                }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Submit Resignation
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Fill in your last working day and reason (optional)
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            label="Last Working Day"
                            type="date"
                            fullWidth
                            value={lastWorkingDay}
                            onChange={(e) => setLastWorkingDay(e.target.value)}
                            required
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>

                    <Box mb={3}>
                        <TextField
                            label="Reason"
                            fullWidth
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            py: 1.2,
                            fontWeight: 'bold',
                            backgroundColor: '#4F46E5'
                        }}>
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </form>

                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={4000}
                    onClose={() => setSuccessMessage('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>


                <Snackbar
                    open={!!error}
                    autoHideDuration={4000}
                    onClose={() => setError('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    );
}

export default ResignationForm;
