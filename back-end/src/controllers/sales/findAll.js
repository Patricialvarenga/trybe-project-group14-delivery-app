const { OK } = require('http-status-codes').StatusCodes;
const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  const { userId: id, role } = req.user;
  try {
    const sales = await service.findAll({ id, role });

    res.status(OK).json(sales);
  } catch (error) {
    console.log(error);
    next(error);
  }
};