// In backend/models/attendanceModel.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    // ADD THIS user field:
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This creates a link to the User model
    },
    date: { type: String, required: true },
    hoursConducted: { type: Number, required: true, min: 0 },
    hoursPresent: { type: Number, required: true, min: 0 },
    isHoliday: { type: Boolean, default: false }
}, {
    // Add a unique constraint for date AND user
    unique: ['date', 'user']
});

module.exports = mongoose.model('Attendance', attendanceSchema);