module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProduct', {
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
    SalesProduct.belongsTo(models.sale, {
      as: 'saleId',
      foreignKey: 'id',
    })
    SalesProduct.belongsTo(models.product, {
      as: 'productId',
      foreignKey: 'id',
    })
  }

  return SalesProduct;
};