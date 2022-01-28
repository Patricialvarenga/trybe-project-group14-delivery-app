const { CREATED } = require('http-status-codes').StatusCodes;
const register = require('../../../service/users/register');

module.exports = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    const newRegister = await register({ email, password, name, role });
    return res.status(CREATED).json({ token: newRegister });
  } catch (err) {
    console.error(err);
    next(err);
  }
};