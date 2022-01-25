'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
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
  }

  return Sale; // teste
};