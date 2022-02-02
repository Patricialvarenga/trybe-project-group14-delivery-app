const { Product } = require('../../database/models');
const { ApiError: { NewError } } = require('../../global/error/apiError');
const { PRODUCT_NOT_EXIST_404 } = require('../../global/error/messages');

const list = async () => {
    const productsList = await Product.findAll();
    return productsList;
};

const create = async ({ name, price, urlImage }) => {
    const newProduct = await Product.create({ name, price, urlImage });
    return newProduct;
};

const findById = async (id) => {
    const foundedProduct = await Product.findByPk(id);
    if (!foundedProduct) return NewError(PRODUCT_NOT_EXIST_404);
    return foundedProduct;
};

const remove = async (id) => {
    const foundedProduct = await Product.findByPk(id);
    if (!foundedProduct) return NewError(PRODUCT_NOT_EXIST_404);
    
    const deleted = await Product.destroy({ where: { id } });
        return { deleted };
};
module.exports = {
    list,
    create,
    findById,
    remove,
};