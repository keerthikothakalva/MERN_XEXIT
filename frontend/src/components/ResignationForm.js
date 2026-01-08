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

function ResignationForm() {
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

        try {
            const token = localStorage.getItem('token'); // token from login

            await api.post(
                '/api/user/resign', // correct backend route
                {
                    lwd: lastWorkingDay, //  backend expects lwd
                    reason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, //  auth header
                    },
                }
            );

            setSuccessMessage('Resignation request submitted successfully.');
            setLastWorkingDay('');
            setReason('');
        } catch (err) {
            console.error(err);
            setError('Failed to submit resignation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <Typography variant="h6" gutterBottom>
                Submit Resignation
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

                <Box mb={2}>
                    <TextField
                        label="Reason"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        multiline
                        rows={4}
                    />
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>

            {successMessage && (
                <Snackbar open autoHideDuration={4000}>
                    <Alert severity="success">{successMessage}</Alert>
                </Snackbar>
            )}

            {error && (
                <Snackbar open autoHideDuration={4000}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </Paper>
    );
}

export default ResignationForm;
