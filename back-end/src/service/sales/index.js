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

module.exports = {
    create,
    findById,
};