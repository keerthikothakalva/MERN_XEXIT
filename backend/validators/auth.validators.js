const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = {
    registerSchema
};
