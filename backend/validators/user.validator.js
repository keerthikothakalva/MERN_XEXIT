const Joi = require('joi');

const validateRegisterUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const validateLoginUser = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const validateResignData = Joi.object({
    empId: Joi.string().required(),
    lwd: Joi.string().required()
});

module.exports = {
    validateRegisterUser,
    validateLoginUser,
    validateResignData
};
