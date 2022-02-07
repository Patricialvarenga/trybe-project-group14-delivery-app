const { sale, salesProduct, user, product } = require('../../database/models');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { SALE_NOT_EXIST_404 } = require('../../global/error/messages');

const create = async ({
     totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products },
     ) => {
    const newSale = await sale.create(
        { totalPrice, deliveryAddress, deliveryNumber, status, userId, sellerId, products },
        );
    const saleId = newSale.dataValues.id;
    const newSalesProducts = products.map(async ({ id, quantityItens }) => {
        const register = await salesProduct.create({
          quantity: quantityItens, saleId, productId: id });
        return register;
    });

    await Promise.all(newSalesProducts);
    return newSale.dataValues;
};

const findById = async (saleId) => {
    const foundedSale = await sale.findOne({
      include: [{ model: user, as: 'seller', attributes: { exclude: ['password'] } },
                { model: user, as: 'customer', attributes: { exclude: ['password'] } },
                { model: product, as: 'products' },
              ],
      where: { id: saleId },
    });

    if (!foundedSale) return NewError(SALE_NOT_EXIST_404);
    return foundedSale;
};

const findAll = async ({ id, role }) => {
  if (role === 'seller') {
    const sales = await sale.findAll({ where: { sellerId: id } });
    if (!sales) return NewError(SALE_NOT_EXIST_404);

    return sales;
  }

  const sales = await sale.findAll({ where: { userId: id } });
  console.log(sales);
  if (!sales) return NewError(SALE_NOT_EXIST_404);

  return sales;
};

module.exports = {
    create,
    findById,
    findAll,
};