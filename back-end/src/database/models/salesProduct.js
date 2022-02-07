/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProduct', {
    saleId: {
      primaryKey: true,
      constraint: true,
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      primaryKey: true,
      constraint: true, 
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      alloNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored:true
  })

  SalesProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      through: SalesProduct,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId'
    })
    models.sale.belongsToMany(models.product, {
      through: SalesProduct,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId'
    })
  }

  SalesProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      foreignKey: 'sale_id',
      through: SalesProduct,
      otherKey: 'product_id',
    });
    models.sale.belongsToMany(models.product, {
      as: 'products',
      foreignKey: 'product_id',
      through: SalesProduct,
      otherKey: 'sale_id',
    });
  };
  return SalesProduct;
};