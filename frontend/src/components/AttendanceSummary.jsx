import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';

const AttendanceSummary = ({ summary }) => {
    const percentage = summary.currentPercentage;
    const isSafe = percentage >= summary.targetPercentage;
    const color = isSafe ? 'success.main' : 'error.main';

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: color, mr: 2 }}>
                        {isSafe ? <CheckCircleOutlineIcon /> : <DangerousOutlinedIcon />}
                    </Avatar>
                    <Typography variant="h5" component="div">
                        Current Status
                    </Typography>
                </Box>
                <Typography variant="h3" sx={{ color, mb: 2 }}>
                    {percentage}%
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Target: {summary.targetPercentage}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Hours Conducted: {summary.totalConducted}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Total Hours Present: {summary.totalPresent}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AttendanceSummary;