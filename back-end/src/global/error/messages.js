const { UNAUTHORIZED, CONFLICT, NOT_FOUND, BAD_REQUEST } = require('http-status-codes').StatusCodes;

const JWT_MALFORMED_401 = { message: 'Jwt malformed', status: UNAUTHORIZED };
const MISSING_TOKEN_401 = { message: 'Missing auth token', status: UNAUTHORIZED };
const EMAIL_EXIST_409 = { message: 'Email already registered', status: CONFLICT };
const INCORRECT_401 = { message: 'Incorrect username or password', status: UNAUTHORIZED };
const USER_NOT_EXIST_404 = { message: 'User not exist', status: NOT_FOUND };
const USER__EXIST_409 = { message: 'User already registered', status: CONFLICT };
const PRODUCT_NOT_EXIST_404 = { message: 'Product not exist', status: NOT_FOUND };
const SALE_NOT_EXIST_404 = { message: 'Sale not exist', status: NOT_FOUND };
const INVALID_ENTRIES_400 = { message: 'Invalid entries', status: BAD_REQUEST };
const INVALID_ID_400 = { message: 'Invalid product ID', status: BAD_REQUEST };
const UNAUTHORIZED_ROLE = { message: 'Incorrect ROLE', status: UNAUTHORIZED };
// const PRODUCT_EXIST_409 = { message: 'Product exist! Please choose another .', status: CONFLICT };

module.exports = {
  JWT_MALFORMED_401,
  MISSING_TOKEN_401,
  EMAIL_EXIST_409,
  INCORRECT_401,
  USER_NOT_EXIST_404,
  USER__EXIST_409,
  PRODUCT_NOT_EXIST_404,
  INVALID_ENTRIES_400,
  INVALID_ID_400,
  UNAUTHORIZED_ROLE,
  SALE_NOT_EXIST_404,
  // PRODUCT_EXIST_409
};
