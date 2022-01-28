const { CREATED } = require('http-status-codes').StatusCodes;

const service = require('../../service/products');

module.exports = async (req, res, next) => {
  try {
    const { name, price, urlImage } = req.body;
    const newProduct = await service.create({ name, price, urlImage });

    return res.status(CREATED).json(newProduct);
  } catch (error) {
    console.error(error);
    next(error);
  }
}; 
