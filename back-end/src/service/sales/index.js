const { sale, salesProducts, user, product } = require('../../database/models');
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
        const register = await salesProducts.create({
          quantity: quantityItens, saleId, productId: id });
        return register;
    });

    await Promise.all(newSalesProducts);
    return newSale.dataValues;
};

const findById = async (id) => {
    const foundedSale = await sale.findByPk(id, { include: [{
      model: product, as: 'products', through: { attributes: ['quantity'] },
    }, { 
      model: user, as: 'seller', attributes: { exclude: ['password'] },
    }] });
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