const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Enable CORS for all origins or specify allowed origins
app.use(cors()); // Allows requests from any origin

// Alternatively, you can configure CORS for specific origins like this:
// app.use(cors({
//   origin: 'http://your-frontend-domain.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

