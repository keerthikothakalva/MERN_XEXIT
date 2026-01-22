"use strict";

var Joi = require('joi');

var validateRegisterUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
var validateLoginUser = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
var validateResignData = Joi.object({
  lwd: Joi.string().required()
});
module.exports = {
  validateRegisterUser: validateRegisterUser,
  validateLoginUser: validateLoginUser,
  validateResignData: validateResignData
};
//# sourceMappingURL=user.validator.dev.js.map
