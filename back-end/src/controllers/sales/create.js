const { CREATED } = require('http-status-codes').StatusCodes;

const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const { 
      totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products,
    } = req.body;

    const newSale = await service.create({
      totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products });

    return res.status(CREATED).json(newSale);
  } catch (error) {
    console.error(error);
    next(error);
  }
};