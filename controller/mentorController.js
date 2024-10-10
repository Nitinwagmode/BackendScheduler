const bcrypt = require('bcrypt');
const Mentor = require('../models/Mentor');

const getAllMentors = async (req, res) => {
    try {
        const mentors = await Mentor.find().select('-password'); // Exclude password from the response
        res.json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getMentorById = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.id).select('-password');
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createMentor = async (req, res) => {
    try {
        const { name, email, password, tech } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const mentor = new Mentor({ name, email, password: hashedPassword, tech });
        await mentor.save();
        res.status(201).json(mentor);
    } catch (error) {
        res.status(500).json({ message: 'Error creating mentor' });
    }
};

const updateMentor = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        if (password) {
            rest.password = await bcrypt.hash(password, 10); // Hash the new password
        }
        const updatedMentor = await Mentor.findByIdAndUpdate(req.params.id, rest, { new: true });
        if (!updatedMentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(updatedMentor);
    } catch (error) {
        res.status(400).json({ message: 'Error updating mentor' });
    }
};

const deleteMentor = async (req, res) => {
    try {
        // console.log("Received request to delete mentor with ID:", req.params.id);
        const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);
        if (!deletedMentor) {
            // console.log("Mentor not found.");
            return res.status(404).json({ message: 'Mentor not found' });
        }
        res.json(deletedMentor);
    } catch (error) {
        console.error('Error in deleteMentor:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor,
};
