const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  // console.log('Received Token:', token); // Debugging line
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This should include the user ID
    next();
  } catch (error) {
    console.error('Token verification error:', error); // Debugging line
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
