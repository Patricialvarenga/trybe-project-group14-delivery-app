const { OK } = require('http-status-codes').StatusCodes;
const login = require('../../../service/users/login');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newLogin = await login({ email, password });
    return res.status(OK).json(newLogin);
  } catch (err) {
    console.error(err);
    next(err);
  }
};