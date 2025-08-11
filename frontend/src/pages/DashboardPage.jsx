// In frontend/src/pages/DashboardPage.jsx
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getSummary } from '../services/api';
import AttendanceSummary from '../components/AttendanceSummary';
import PredictionEngine from '../components/PredictionEngine';
import UpdateForm from '../components/UpdateForm';
import TargetUpdater from '../components/TargetUpdater';
const DashboardPage = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout } = useContext(AuthContext);

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
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>My Attendance Dashboard</h1>
                <button onClick={logout} style={{backgroundColor: '#dc3545'}}>Logout</button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {summary && (
                <>
                    <div className="card">
                      <AttendanceSummary summary={summary} />
                    </div>
                    <div className="card">
                      <PredictionEngine prediction={summary.prediction} />
                    </div>
                    <div className="card">
                        <TargetUpdater />
                    </div>
                </>
            )}
            <div className="card">
                <UpdateForm onUpdate={fetchSummary} />
            </div>
        </div>
    );
};

export default DashboardPage;