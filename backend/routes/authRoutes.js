// In backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
// CHANGE setupUser to registerUser
const { registerUser, loginUser } = require('../controllers/authController');

// CHANGE this route from /setup to /register
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;