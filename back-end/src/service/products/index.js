const { product } = require('../../database/models');

const list = async () => {
    const productsList = await product.findAll();
    return productsList;
};

module.exports = {
    list,
};