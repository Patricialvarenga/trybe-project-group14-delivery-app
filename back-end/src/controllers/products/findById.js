const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findById(id);

    return res.status(OK).json(product);
  } catch (error) {
    next(error);
  }
};