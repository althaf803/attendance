// In frontend/src/components/TargetUpdater.jsx
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { updateUserTarget } from '../services/api';

const TargetUpdater = () => {
    const { user, setToken, setUser } = useContext(AuthContext);
    // Initialize state with the user's current target
    const [target, setTarget] = useState(user?.targetPercentage || '75');
    const [message, setMessage] = useState('');

    // Update the form if the user context changes
    useEffect(() => {
        if (user) {
            setTarget(user.targetPercentage);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const { data } = await updateUserTarget({ targetPercentage: Number(target) });
            // Update context and local storage with the new user data from the API
            setUser(data);
            setToken(data.token);
            setMessage('Target updated successfully!');
        } catch (error) {
            setMessage('Failed to update target. Please try again.');
        }
    };

    return (
        <div>
            <h3>Change Attendance Target</h3>
            <form onSubmit={handleSubmit}>
                <label>New Target (%):</label>
                <input
                    type="number"
                    min="1"
                    max="100"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    style={{ width: '100px', marginRight: '10px' }}
                />
                <button type="submit">Update Target</button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default TargetUpdater;