require('dotenv').config();
const { UNAUTHORIZED } = require('http-status-code').StatusCodes;
const jwt = require('jsonwebtoken');
const messages = require('../../error/messages');
// importar o model

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
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(UNAUTHORIZED).json(messages.MISSING_TOKEN_401);
    }
    const decoded = jwt.verify(authorization, process.env.SECRET); // trocar a secret
    const { id, email, role } = decoded.data;
    // const foundedEmail = await modelUsers.findByEmail(email); // mudar as funções 
    // if (!foundedEmail) return next(messages.JWT_MALFORMED_401);
    req.user = { id, email, role };
    next(); 
  } catch (err) {
    // console.log(err.message);
    next(messages.JWT_MALFORMED_401);
  }
};

module.exports = {
  createToken,
  verifyToken,
};