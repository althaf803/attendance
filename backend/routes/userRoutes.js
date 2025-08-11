// In backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Add the 'protect' middleware to ensure only logged-in users can access this
router.route('/profile').put(protect, updateUserProfile);

module.exports = router;