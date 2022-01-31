/* const { CREATED } = require('http-status-codes').StatusCodes;

const service = require('../../service/sales');

module.exports = async (req, res, next) => {
  try {
    const {
         totalPrice, deliveryAdress, deliveryNumber, status, sellerId,
        } = req.body;

        const { id: userId } = req.user;
        
    const newSale = await service.create({
         totalPrice, deliveryAdress, deliveryNumber, status, userId, sellerId });

    return res.status(CREATED).json(newSale);
  } catch (error) {
    console.error(error);
    next(error);
  }
}; */