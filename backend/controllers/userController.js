// In backend/controllers/userController.js
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Update user profile (specifically targetPercentage)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);

    if (user) {
        user.targetPercentage = req.body.targetPercentage || user.targetPercentage;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            targetPercentage: updatedUser.targetPercentage,
            token: generateToken(updatedUser._id) // Send back a new token
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { updateUserProfile };