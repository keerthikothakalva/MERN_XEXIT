const Employee = require('../models/employee.model');
const ResignInfo = require('../models/resign.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await Employee.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const approveResignation = async (req, res) => {
    try {
        const { resignationId, approved } = req.body;

        const updated = await ResignInfo.findByIdAndUpdate(
            resignationId,
            { status: approved },
            { new: true }
        );

        res.status(200).send(updated);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    approveResignation,
    deleteUser
};
