// In frontend/src/components/AttendanceSummary.jsx
const AttendanceSummary = ({ summary }) => {
    const percentage = summary.currentPercentage;
    const color = percentage >= 75 ? 'green' : 'red';

    return (
        <div>
            <h2>Current Status</h2>
            <h3 style={{ color }}>Overall Percentage: {percentage}%</h3>
            <p>Total Hours Conducted: {summary.totalConducted}</p>
            <p>Total Hours Present: {summary.totalPresent}</p>
        </div>
    );
};
export default AttendanceSummary;