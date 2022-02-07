const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const { id: saleId } = req.params;
    const sale = await service.findById(saleId);

    return res.status(OK).json(sale);
  } catch (error) {
    next(error);
  }
};