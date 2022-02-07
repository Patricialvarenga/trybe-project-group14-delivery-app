const { OK } = require('http-status-codes').StatusCodes;
const { findAllSellers } = require('../../../service/users/findAll');

module.exports = async (_req, res, next) => {
  try {
    const sellers = await findAllSellers();
    return res.status(OK).json(sellers);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};