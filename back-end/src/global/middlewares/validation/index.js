const Joi = require('joi');
const rescue = require('express-rescue');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

const SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const SCHEMARegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const SHEMAProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  urlImage: Joi.string().required(),
});

const SHEMESale = Joi.object({
  totalPrice: Joi.number().precision(2).positive().required(),
  deliveryAdress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  userId: Joi.number().positive().required(),
  sellerId: Joi.number().positive().required(),
});

const login = rescue(async (req, _res, next) => {
  const { error } = SCHEMALogin.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const register = rescue(async (req, _res, next) => {
  const { error } = SCHEMARegister.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const product = rescue(async (req, _res, next) => {
  const { error } = SHEMAProduct.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const sale = rescue(async (req, _res, next) => {
  const { error } = SHEMESale.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

module.exports = {
  login,
  register,
  product,
  sale,
};
