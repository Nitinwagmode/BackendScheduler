// routes/userRoutes.js
const express = require('express');
const {
  getAllUsers,
  createUser,
  modifyUser,
  removeUser,
} = require('../controller/userController');

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// POST a new user
router.post('/', createUser);

// PUT (update) a user by ID
router.put('/:id', modifyUser);

// DELETE a user by ID
router.delete('/:id', removeUser);

module.exports = router;
