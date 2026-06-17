import Joi from 'joi';

export const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  FRONTEND_URL: Joi.string().required(),
  MAIL_HOST: Joi.string().default('localhost'),
  MAIL_PORT: Joi.number().default(1025),
  MAIL_USER: Joi.string().allow('', null),
  MAIL_PASS: Joi.string().allow('', null),
  MAIL_FROM: Joi.string().default('no-reply@stack.com'),
});
