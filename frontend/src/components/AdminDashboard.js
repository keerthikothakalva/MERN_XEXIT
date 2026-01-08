import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminDashboard = () => {
    const [resignationRequests, setResignationRequests] = useState([]);

    useEffect(() => {
        const fetchResignationRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8080/api/admin/resignations', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setResignationRequests(response.data);
            } catch (error) {
                console.error('Error fetching resignation requests:', error);
                alert('Failed to load resignation requests.');
            }
        };

        fetchResignationRequests();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8080/api/admin/resignation/${id}/approve`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Resignation approved');
            setResignationRequests((prev) => prev.filter((req) => req._id !== id));
        } catch (error) {
            console.error('Error approving resignation:', error);
            alert('Failed to approve resignation.');
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:8080/api/admin/resignation/${id}/reject`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Resignation rejected');
            setResignationRequests((prev) => prev.filter((req) => req._id !== id));
        } catch (error) {
            console.error('Error rejecting resignation:', error);
            alert('Failed to reject resignation.');
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Last Working Day</TableCell>
                            <TableCell>Reason</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resignationRequests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request.empId}</TableCell>
                                <TableCell>{request.employeeName}</TableCell>
                                <TableCell>{new Date(request.lwd).toLocaleDateString()}</TableCell>
                                <TableCell>{request.reason}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleApprove(request._id)}
                                        style={{ marginRight: '8px' }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleReject(request._id)}
                                    >
                                        Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminDashboard;
