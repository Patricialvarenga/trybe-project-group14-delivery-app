'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
    seller_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
  })

  Sale.association = (models) => {
    models.Sale.hasMany(models.User, {
      as: 'user_id',
      foreignKey: 'id'
    });
    models.Sale.hasMany(models.User, {
      as: 'seller_id',
      foreignKey: 'id'
    })
    models.Sale.hasMany(models.SalesProduct, {
      as: 'sale_id',
      foreignKey: 'id'
    })
  }

  return Sale;
};