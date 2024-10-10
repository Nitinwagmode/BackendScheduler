const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup
exports.signup = async (req, res) => {
  const { name, email, password, tech } = req.body;
  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Define the allowed roles
    const allowedRoles = ['admin', 'co-admin', 'ReactJs', 'SQL'];

    // Check if the provided role is allowed
    if (!allowedRoles.includes(tech)) {
      return res.status(400).json({ msg: 'Invalid role provided' });
    }

    // Create new user with the assigned role
    user = new User({
      name,
      email,
      password,
      tech
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Create JWT token
    const payload = { userId: user.email , tech: user.tech };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token along with user info
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        tech: user.tech
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create JWT token (role is retrieved from the user's data)
    const payload = { userId: user._id, userEmail: user.email, tech: user.tech };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user info
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        tech: user.tech
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};
