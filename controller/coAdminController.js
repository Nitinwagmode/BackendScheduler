const bcrypt = require('bcrypt');
const CoAdmin = require('../models/CoAdmin');

const getAllCoAdmins = async (req, res) => {
    try {
        const coAdmins = await CoAdmin.find().select('-password'); // Exclude password from the response
        res.json(coAdmins);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getCoAdminById = async (req, res) => {
    try {
        const coAdmin = await CoAdmin.findById(req.params.id).select('-password');
        if (!coAdmin) {
            return res.status(404).json({ message: 'Co-admin not found' });
        }
        res.json(coAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createCoAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const coAdmin = new CoAdmin({ name, email, password: hashedPassword });
        await coAdmin.save();
        res.status(201).json(coAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error creating co-admin' });
    }
};

const updateCoAdmin = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        if (password) {
            rest.password = await bcrypt.hash(password, 10); // Hash the new password
        }
        const updatedCoAdmin = await CoAdmin.findByIdAndUpdate(req.params.id, rest, { new: true });
        if (!updatedCoAdmin) {
            return res.status(404).json({ message: 'Co-admin not found' });
        }
        res.json(updatedCoAdmin);
    } catch (error) {
        res.status(400).json({ message: 'Error updating co-admin' });
    }
};

const deleteCoAdmin = async (req, res) => {
    try {
        const deletedCoAdmin = await CoAdmin.findByIdAndDelete(req.params.id);
        if (!deletedCoAdmin) {
            return res.status(404).json({ message: 'Co-admin not found' });
        }
        res.json(deletedCoAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllCoAdmins,
    getCoAdminById,
    createCoAdmin,
    updateCoAdmin,
    deleteCoAdmin,
};
