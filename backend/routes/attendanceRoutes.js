// In backend/routes/attendanceRoutes.js
const express = require('express');
const router = express.Router();
const { getSummary, addOrUpdateRecord, getAllRecords } = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/summary').get(protect, getSummary);
router.route('/').post(protect, addOrUpdateRecord);
router.route('/all').get(protect, getAllRecords); // For history view

module.exports = router;