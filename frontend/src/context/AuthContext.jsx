// In frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../services/api'; // Use aliasing
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const navigate = useNavigate();

    const login = async (username, password) => {
        const { data } = await apiLogin({ username, password });
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data);
        navigate('/');
    };
    
    // ADD THIS NEW REGISTER FUNCTION
    const register = async (username, password, targetPercentage) => {
        const { data } = await apiRegister({ username, password, targetPercentage });
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser(data);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        navigate('/login');
    };
    
    return (
        <AuthContext.Provider value={{ token, user, login, register, logout, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;