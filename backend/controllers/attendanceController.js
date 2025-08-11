// In backend/controllers/attendanceController.js
const Attendance = require('../models/attendanceModel');
const User = require('../models/userModel'); // Import User model to get target %

// @desc    Add or update a user-specific attendance record
// @route   POST /api/attendance
const addOrUpdateRecord = async (req, res) => {
    const { date, hoursConducted, hoursPresent, isHoliday } = req.body;
    const userId = req.user.id; // From our 'protect' middleware

    if (!date) {
        return res.status(400).json({ message: 'Date is required.' });
    }

    const record = await Attendance.findOneAndUpdate(
        { date, user: userId }, // Find by date AND user
        { date, hoursConducted, hoursPresent, isHoliday, user: userId },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(record);
};

// @desc    Get all records for a specific user
// @route   GET /api/attendance/all
const getAllRecords = async (req, res) => {
    const records = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
    res.json(records);
};

// @desc    Get the full attendance summary and predictions for a specific user
// @route   GET /api/attendance/summary
const getSummary = async (req, res) => {
    const user = await User.findById(req.user.id);
    const target = user.targetPercentage / 100; // e.g., 0.75
    
    // Find records ONLY for the logged-in user
    const records = await Attendance.find({ user: req.user.id, isHoliday: false });

    if (records.length === 0) {
        return res.json({
            totalConducted: 0,
            totalPresent: 0,
            currentPercentage: 0,
            targetPercentage: user.targetPercentage,
            prediction: { message: `No attendance data yet. Your target is ${user.targetPercentage}%.` }
        });
    }

    const totals = records.reduce((acc, rec) => {
        acc.conducted += rec.hoursConducted;
        acc.present += rec.hoursPresent;
        return acc;
    }, { conducted: 0, present: 0 });

    const totalConducted = totals.conducted;
    const totalPresent = totals.present;
    const currentPercentage = totalConducted > 0 ? (totalPresent / totalConducted) * 100 : 0;

    let prediction = {};
    
    if (currentPercentage < user.targetPercentage) {
        // Formula: x >= (T * target - P) / (1 - target)
        const hoursNeeded = Math.ceil(((totalConducted * target) - totalPresent) / (1 - target));
        if (hoursNeeded > 0) {
            prediction = {
                message: `You need to attend the next **${hoursNeeded} hours** to reach your ${user.targetPercentage}% target.`
            };
        } else {
            prediction = { message: "You are on track. Keep attending classes." };
        }
    } else {
        // Formula: y <= (P - T * target) / target
        const hoursCanBunk = Math.floor((totalPresent - (totalConducted * target)) / target);
        if (hoursCanBunk > 0) {
            prediction = {
                message: `You can bunk the next **${hoursCanBunk} hours** and stay above your ${user.targetPercentage}% target.`
            };
        } else {
            prediction = { message: `You are safely above your target, but cannot bunk any classes yet without dropping below it.` };
        }
    }

    res.json({
        totalConducted,
        totalPresent,
        currentPercentage: parseFloat(currentPercentage.toFixed(2)),
        targetPercentage: user.targetPercentage,
        prediction
    });
};

module.exports = { getSummary, addOrUpdateRecord, getAllRecords };