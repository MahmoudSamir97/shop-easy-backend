const joi = require('joi');

const signupSchema = joi.object({
  userName: joi.string().min(3).max(25).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['net', 'com', 'eg'] } })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp(/^[A-Z][a-z1-9]{6,}[@#$%^&*]{1,}$/))
    .required(),
  //   repeated_password: joi.ref("password"),
  CPassword: joi.string().required().valid(joi.ref('password')),
  role: joi.string(),
  isDeleted: joi.boolean(),
  isVerfied: joi.boolean(),
  phoneNumber: joi
    .string()
    .pattern(new RegExp(/^01[0|1|2|5]{1}[0-9]{8}$/))
    .required(),
});

module.exports = signupSchema;
