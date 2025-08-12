import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getSummary } from '../services/api';
import AttendanceSummary from '../components/AttendanceSummary';
import PredictionEngine from '../components/PredictionEngine';
import UpdateForm from '../components/UpdateForm';
import TargetUpdater from '../components/TargetUpdater';
import { Box, Container, Grid, Typography, CircularProgress, AppBar, Toolbar, Button } from '@mui/material';

const DashboardPage = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout, user } = useContext(AuthContext);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            const { data } = await getSummary();
            setSummary(data);
            setError('');
        } catch (err) {
            setError('Failed to fetch summary data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Attendance Dashboard
                    </Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {/* Summary Card */}
                        <Grid item xs={12} md={6}>
                            <AttendanceSummary summary={summary} />
                        </Grid>
                        {/* Prediction Card */}
                        <Grid item xs={12} md={6}>
                            <PredictionEngine prediction={summary.prediction} />
                        </Grid>
                        {/* Update Form Card */}
                        <Grid item xs={12} md={7}>
                            <UpdateForm onUpdate={fetchSummary} />
                        </Grid>
                        {/* Target Updater Card */}
                        <Grid item xs={12} md={5}>
                            <TargetUpdater />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default DashboardPage;