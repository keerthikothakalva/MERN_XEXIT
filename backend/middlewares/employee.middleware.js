const {
  validateRegisterUser,
  validateLoginUser,
  validateResignData
} = require('../validators/user.validator.js');

const EmployeeLogics = require('../services/employee.service');
const allEmployeeLogics = new EmployeeLogics();


const validateRegInfo = (req, res, next) => {
  const { error } = validateRegisterUser.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};

/* ======================
   LOGIN VALIDATION
====================== */
const validateLogInfo = (req, res, next) => {
  const { error } = validateLoginUser.validate(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  next();
};


const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const decoded = allEmployeeLogics.compareToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    const user = await allEmployeeLogics.findUserById(decoded.id);
    if (!user) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = user; 

    next();
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
};


const validateResignInfo = (req, res, next) => {
  const { error } = validateResignData.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
};

module.exports = {
  validateRegInfo,
  validateLogInfo,
  validateResignInfo,
  auth
};
