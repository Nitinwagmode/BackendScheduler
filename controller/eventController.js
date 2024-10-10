const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  const { title, start, end, userId } = req.body;

  // Basic validation
  if (!title || !start || !end || !userId) {
    return res.status(400).json({ msg: 'Title, start, end, and userId are required' });
  }

  // Check if the start date is before the end date
  if (new Date(start) >= new Date(end)) {
    return res.status(400).json({ msg: 'Start date must be before the end date' });
  }

  try {
    const newEvent = new Event({
      title,
      start,
      end,
      userId,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ msg: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all events
// exports.getEvents = async (req, res) => {
//     console.log('User from request:', req.user); // Debugging line
//     try {
//         const userId = req.user.userId; // Corrected line to access userId
        
//         if (!userId) {
//             return res.status(400).json({ msg: 'User ID not found' });
//         }

//         const events = await Event.find({ userId });
//         res.status(200).json(events);
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(500).json({ msg: 'Server error', error: error.message });
//     }
// };

// Get all events for a specific user
exports.getEvents = async (req, res) => {
    try {
      const userId = req.user.userId; // Assuming userId is set in the request object
  
      if (!userId) {
        return res.status(400).json({ msg: 'User ID not found' });
      }
  
      const events = await Event.find({ userId });
      res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching events:", error); // Log the error for debugging
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };
  

// Delete an event
exports.deleteEvent = async (req, res) => {
  const { id } = req.params; // Destructure id from req.params

  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.status(200).json({ msg: 'Event deleted' });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ msg: 'Server error' });
  }
};
