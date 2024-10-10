const express = require('express');
const { createEvent, getEvents, deleteEvent } = require('../controller/eventController');
const authenticate  = require('../middlewares/authMiddleware')
const router = express.Router();

// POST api/events - Create a new event
router.post('/', createEvent);

// GET api/events - Get all events
router.get('/:id', authenticate, getEvents);

// DELETE api/events/:id - Delete an event
router.delete('/:id', deleteEvent);

module.exports = router;
