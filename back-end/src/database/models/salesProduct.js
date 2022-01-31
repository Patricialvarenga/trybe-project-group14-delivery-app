module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    sale_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    product_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      alloNull: false,
    },
  },{
    timestamps: false,
  })

  SalesProduct.association = (models) => {
    models.SalesProduct.belongsTo(models.Sale, {
      as: 'sale_id',
      foreignKey: 'id',
    })
    models.SalesProduct.belongsTo(models.Product, {
      as: 'product_id',
      foreignKey: 'id',
    })
  }

  return SalesProduct;
};