import Joi from 'joi';

const signUpValidationSchema = function() {
  return Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30)
      .required(),
    clientId: Joi.number().integer(),
    phone: Joi.number().integer(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string()
      .trim()
      .min(6)
      .required(),
    confirmPassword: Joi.string()
      .trim()
      .min(6)
      .required()
  });
};

const loginValidationSchema = function(params) {
  return Joi.object().keys({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    }),
    password: Joi.string()
      .trim()
      .min(6)
      .required()
  });
};

export { signUpValidationSchema, loginValidationSchema };
