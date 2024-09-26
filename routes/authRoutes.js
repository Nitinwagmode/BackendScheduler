const express = require('express');
const { signup, login } = require('../controller/authController');
const router = express.Router();

// POST api/auth/signup - Sign up a new user
router.post('/signup', signup);

// POST api/auth/login - Log in an existing user
router.post('/login', login);

module.exports = router;
