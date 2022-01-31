const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.remove(id);
    if (!product) {
        return null;
    }
    return res.status(OK).json({ id, message: 'Product deleted', status: 'Success' });
  } catch (error) {
    next(error);
  }
};