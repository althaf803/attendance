// In frontend/src/components/UpdateForm.jsx
import { useState } from 'react';
import { addOrUpdateRecord } from '../services/api';

const UpdateForm = ({ onUpdate }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
    const [hoursConducted, setHoursConducted] = useState('');
    const [hoursPresent, setHoursPresent] = useState('');
    const [isHoliday, setIsHoliday] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const data = {
                date,
                hoursConducted: isHoliday ? 0 : Number(hoursConducted),
                hoursPresent: isHoliday ? 0 : Number(hoursPresent),
                isHoliday,
            };
            await addOrUpdateRecord(data);
            setMessage(`Successfully updated record for ${date}.`);
            onUpdate(); // Refresh the dashboard data
        } catch (err) {
            setMessage('Failed to update record.');
        }
    };

    return (
        <div>
            <h2>Update Daily Attendance</h2>
            <form onSubmit={handleSubmit}>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

                <label>
                    <input type="checkbox" checked={isHoliday} onChange={(e) => setIsHoliday(e.target.checked)} />
                    Mark as Holiday / No Class
                </label>

                {!isHoliday && (
                    <>
                        <label>Hours Conducted:</label>
                        <input type="number" value={hoursConducted} onChange={(e) => setHoursConducted(e.target.value)} placeholder="e.g., 6" required />

                        <label>Hours Present:</label>
                        <input type="number" value={hoursPresent} onChange={(e) => setHoursPresent(e.target.value)} placeholder="e.g., 6" required />
                    </>
                )}

                <button type="submit">Update</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default UpdateForm;