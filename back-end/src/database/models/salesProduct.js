module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProducts', {
    sale_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    product_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },{
    timestamp: false,
  })

  SalesProduct.association = (models) => {
    models.SalesProduct.belongsTo(models.Sale, {
      through: SalesProduct,
      otherKey: 'sale_id',
      as: 'sale_id',
      foreignKey: 'id',
    })
    models.SalesProduct.belongsTo(models.Product, {
      through: SalesProduct,
      otherKey: 'product_id',
      as: 'product_id',
      foreignKey: 'id',
    })
  }

  return SalesProduct;
};