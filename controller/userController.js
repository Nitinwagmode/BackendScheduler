// controllers/userController.js
const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

const createUser = async (req, res) => {
    try {
      const { name, email, password, tech, mentor } = req.body;
      const user = new User({ name, email, password, tech, mentor });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', details: error.errors });
      }
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };
  
  
const modifyUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
};

const removeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send('User not found');
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  modifyUser,
  removeUser,
  getUserById,
};
