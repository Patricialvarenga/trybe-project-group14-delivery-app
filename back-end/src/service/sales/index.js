/* const { Sale, SalesProduct } = require('../../database/models');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { SALE_NOT_EXIST_404 } = require('../../global/error/messages');

const create = async ({
     totalPrice, deliveryAdress, deliveryNumber, status, userId, sellerId, productIds,
      }) => {
    const newSale = await Sale.create(
        { totalPrice, deliveryAdress, deliveryNumber, status, userId, sellerId },
        );
    const { id: saleId } = newSale;

    const newSalesProducts = productIds.map(({ id: productId, quantity }) => SalesProduct.create(
        { quantity, saleId, productId },
    ));

    await Promise.all(newSalesProducts);  
    return newSale;
};

const findById = async (id) => {
    const foundedSale = await Sale.findByPk(id);
    if (!foundedSale) return NewError(SALE_NOT_EXIST_404);
    return foundedSale;
};

module.exports = {
    create,
    findById,
}; */