const { Product } = require('../../database/models');

const list = async () => {
    const productsList = await Product.findAll();
    return productsList;
}

module.exports = {
    list,
}