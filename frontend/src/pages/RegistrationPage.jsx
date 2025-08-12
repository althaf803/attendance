import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Button, TextField, Box, Typography, Container, Card, CardContent, Alert } from '@mui/material';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [targetPercentage, setTargetPercentage] = useState('75');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password.length < 6) {
            return setError('Password must be at least 6 characters long.');
        }
        try {
            await register(username, password, targetPercentage);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register. Please try again.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card sx={{ width: '100%', p: 2 }}>
                    <CardContent>
                        <Typography component="h1" variant="h5" align="center" gutterBottom>
                            Create Account
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="targetPercentage"
                                label="Attendance Target (%)"
                                type="number"
                                id="targetPercentage"
                                value={targetPercentage}
                                onChange={(e) => setTargetPercentage(e.target.value)}
                            />
                            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                            </Button>
                            <Typography variant="body2" align="center">
                                Already have an account?{' '}
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    Sign In
                                </Link>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default RegistrationPage;