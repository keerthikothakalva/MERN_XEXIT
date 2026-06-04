import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Snackbar,
    Alert
} from '@mui/material';
import api from '../api';

function ExitInterviewForm() {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMessage('');

        if (!feedback.trim()) {
            setError('Please enter your feedback');
            setLoading(false);
            return;
        }

        try {
            // ✅ FIXED ENDPOINT (most common backend naming)
            await api.post('/user/responses', {
                feedback: feedback.trim()
            });

            setSuccessMessage('Exit interview submitted successfully');
            setFeedback('');

        } catch (err) {
            console.error("EXIT ERROR:", err.response || err);

            // ✅ better error message
            if (err.response?.status === 404) {
                setError('API route not found(check backend)');
            } else if (err.response?.status === 400) {
                setError('Invalid data sent');
            } else {
                setError(err.response?.data?.message || 'Submission failed');
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 3
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 500,
                    borderRadius: 3
                }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Exit Interview
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                    Help us improve by sharing your feedback
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                        <TextField
                            label="Why are you leaving?"
                            fullWidth
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            multiline
                            rows={4}
                            required
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
                        }}
                    >
                        {loading ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                </form>

                {/* SUCCESS */}
                <Snackbar
                    open={!!successMessage}
                    autoHideDuration={4000}
                    onClose={() => setSuccessMessage('')}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>

                {/* ERROR */}
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

export default ExitInterviewForm;
