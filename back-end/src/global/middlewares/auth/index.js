require('dotenv').config();
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const { user } = require('../../../database/models');
const messages = require('../../error/messages');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secretKey = fs
    .readFileSync(path.normalize(`${__dirname}../../../../../jwt.evaluation.key`), 'utf-8').trim();

const createToken = (newUserData) => {
  const { id, email, role } = newUserData;
  const token = jwt.sign({ data: { id, email, role } }, secretKey, jwtConfig);
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(UNAUTHORIZED).json(messages.MISSING_TOKEN_401);
    }

    const decoded = jwt.verify(authorization, secretKey);
    const { id, email, role } = decoded.data;
    const foundedEmail = await user.findOne({ where: { email } });

    if (!foundedEmail) return next(messages.JWT_MALFORMED_401);
    req.user = { id, email, role };
    next();
  } catch (err) {
    console.log(err.message);
    next(messages.JWT_MALFORMED_401);
  }
};

const verifyRoleAdm = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(UNAUTHORIZED).json(messages.MISSING_TOKEN_401);
    }

    const decoded = jwt.verify(authorization, secretKey);
    const { email, role } = decoded.data;
    const foundedEmail = await user.findOne({ where: { email } });
    if (foundedEmail.role !== role) return next(messages.UNAUTHORIZED_ROLE);
   
    next();
  } catch (err) {
    console.log(err.message);
    next(messages.UNAUTHORIZED_ROLE);
  }
};

module.exports = {
  createToken,
  verifyToken,
  verifyRoleAdm,
};