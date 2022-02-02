module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
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
    tableName: 'salesProducts',
    underscored:true
  })

  SalesProduct.association = (models) => {
    models.SalesProduct.belongsTo(models.Sale, {
      as: 'saleId',
      foreignKey: 'id',
    })
    models.SalesProduct.belongsTo(models.Product, {
      as: 'productId',
      foreignKey: 'id',
    })
  }

  return SalesProduct;
};