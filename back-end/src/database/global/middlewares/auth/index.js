require('dotenv').config();
const { UNAUTHORIZED } = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const messages = require('../../error/messages');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createToken = (body) => {
  const token = jwt.sign({ data: body }, process.env.SECRET, jwtConfig);
  return token;
};

const verifyToken = async (req, res, next) => {
  try {
    req.user = decoded.data;
    next(); 
  } catch (err) {
    next(messages.JWT_MALFORMED_401);
  }
}

module.exports = {
  createToken,
  verifyToken,
};