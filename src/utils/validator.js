const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  age: Joi.number().integer().min(18).required(),
  city: Joi.string().required(),
  zipCode: Joi.string().regex(/^\d{5}$/).required()
});

const idSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();

function validateUser(user) {
  const { error } = userSchema.validate(user);
  if (error) throw new Error(error.details[0].message);
}

function validateId(id) {
  const { error } = idSchema.validate(id);
  if (error) throw new Error(error.details[0].message);
}

module.exports = { validateUser, validateId };
