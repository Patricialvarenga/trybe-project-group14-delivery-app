const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await service.findById(id);

    return res.status(OK).json(sale);
  } catch (error) {
    next(error);
  }
};