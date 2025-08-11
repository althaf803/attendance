// In backend/index.js

// 1. Import all required packages first
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load environment variables IMMEDIATELY
dotenv.config();

// 3. Now, import your route files
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const userRoutes = require('./routes/userRoutes');

// 4. Create the Express app
const app = express();

// 5. Set up CORS middleware before anything else
const allowedOrigins = [
    'http://localhost:5173',
    'https://checkmyattendance.netlify.app'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.use(cors(corsOptions));

// 6. Set up other middleware
app.use(express.json()); // Allows server to accept JSON data

// 7. Use your routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('Attendance Tracker API is running!');
});

// 8. Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// 9. Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));