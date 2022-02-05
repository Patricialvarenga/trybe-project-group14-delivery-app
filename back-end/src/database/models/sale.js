'use strict';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    deliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    deliveryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      },
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pendente',
      validate: {
        isIn: [['Pendente', 'Preparando', 'Saiu pra entrega', 'Entregue']]
      }
    },
  },{
    timestamps: false,
    tableName: 'sales',
    underscored:true,

  });

  Sale.association = (models) => {
    models.Sale.belongsTo(models.user, {
      as: 'userId',
      foreignKey: 'id'
    });
    models.Sale.belongsTo(models.user, {
      as: 'sellerId',
      foreignKey: 'id'
    });
  }

  return Sale;
};