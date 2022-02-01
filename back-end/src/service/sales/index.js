const { Sale, SalesProduct } = require('../../database/models');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { SALE_NOT_EXIST_404 } = require('../../global/error/messages');

const create = async ({
     totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products },
     ) => {
    const newSale = await Sale.create(
        { totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products },
        );
    const saleId = newSale.id;

    const newSalesProducts = products.map(async ({ productId, quantity }) => {
        const register = await SalesProduct.create({ quantity, saleId, productId });
        return register;
    });

    await Promise.all(newSalesProducts);
    return newSale;
};

const findById = async (id) => {
    const foundedSale = await Sale.findByPk(id);
    if (!foundedSale) return NewError(SALE_NOT_EXIST_404);
    return foundedSale;
};

const findAll = async ({ id, role }) => {
    const userId = id;
    const sellerId = id;
    try {
      if (role === 'customer') {
        let sales = await Sale.findAll({ where: { userId } });
  
        if (!sales)return NewError(SALE_NOT_EXIST_404);
  
        return sales;
      }

      if (role === 'seller') {
        let sales = await Sale.findAll({ where: { sellerIdgit log } });
  
        if (!sales)return NewError(SALE_NOT_EXIST_404);
  
        return sales;
      }
  
    } catch (error) {
      return error;
    }
  };

module.exports = {
    create,
    findById,
    findAll
};