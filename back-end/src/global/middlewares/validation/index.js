const Joi = require('joi');
const rescue = require('express-rescue');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;

const SCHEMALogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const SCHEMARegister = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const SCHEMARegisterByAdm = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
});

const SCHEMAProduct = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  urlImage: Joi.string().required(),
});

const SCHEMASale = Joi.object({
  totalPrice: Joi.number().precision(2).positive().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  sellerId: Joi.number().positive().required(),
  products: Joi.array().required(),
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

const registerByAdm = rescue(async (req, _res, next) => {
  const { error } = SCHEMARegisterByAdm.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const product = rescue(async (req, _res, next) => {
  const { error } = SCHEMAProduct.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

const sale = rescue(async (req, _res, next) => {
  const { error } = SCHEMASale.validate(req.body);
  if (error) return next({ message: error.message, status: BAD_REQUEST });
  next();
});

module.exports = {
  login,
  register,
  registerByAdm,
  product,
  sale,
};
