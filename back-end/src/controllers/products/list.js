const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/products');

module.exports = async (_req, res, next) => {
  try {
    const listProducts = await service.list();
    return res.status(OK).json(listProducts);
  } catch (err) {
    console.error(err);
    next(err);
  }
};