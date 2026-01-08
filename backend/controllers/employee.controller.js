const employeeLogics = require('../services/employee.service.js');
const allEmployeeLogics = new employeeLogics();

// Register
const registerNewUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await allEmployeeLogics.getUserByName(username);
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const newUser = await allEmployeeLogics.registerUser({ username, password });

        return res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await allEmployeeLogics.getUserByName(username);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isValid = await allEmployeeLogics.validatePassword(password, user.password);
        if (!isValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        const token = allEmployeeLogics.createToken({ id: user._id });

        return res.status(200).send({ token });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Resign
const newUserResign = async (req, res) => {
    try {
        const { lwd } = req.body;

        const resignData = {
            empId: req.user._id,
            lwd,
            status: 'pending'
        };

        await allEmployeeLogics.addResignOfEmployee(resignData);

        return res.status(201).send({ message: 'Resignation submitted' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete resignation
const deleteResign = async (req, res) => {
    try {
        await allEmployeeLogics.deleteResignData(req.user._id);
        return res.status(200).send({ message: 'Resignation deleted' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    registerNewUser,
    loginUser,
    newUserResign,
    deleteResign
};
