const Joi = require('joi');
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();

// define validation for all the env vars
// const envVarsSchema = Joi.object({
//     NODE_ENV: Joi.string()
//         .allow(['development', 'production', 'test', 'provision'])
//         .default('development'),
//     PORT: Joi.number()
//         .default(4000),
//     API_VERSION: Joi.string()
//         .default('1')
//         .description('API Version'),
//     JWT_SECRET: Joi.string().required()
//         .description('JWT Secret required to sign'),
// }).unknown()
//     .required();
//
// const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
// if (error) {
//     throw new Error(`Config validation error: ${error.message}`);
// }

const config = {
    NODE_ENV:process.env.NODE_ENV,
    PORT:process.env.PORT,
    JWT_SECRET:process.env.JWT_SECRET,

};

module.exports = config


