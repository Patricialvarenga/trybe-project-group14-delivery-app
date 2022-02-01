'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    seller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    delivery_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        idDate: true
      },
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Preparando',
      validate: {
        isIn: [['Pendente', 'Preparando', 'Saiu pra entrega', 'Entregue']]
      }
    },
  },{
    createAt: 'sale_date',
    tableName: 'sales'
  });

  Sale.association = (models) => {
    models.Sale.belongsTo(models.User, {
      as: 'user_id',
      foreignKey: 'id'
    });
    models.Sale.belongsTo(models.User, {
      as: 'seller_id',
      foreignKey: 'id'
    });
  }

  return Sale;
};