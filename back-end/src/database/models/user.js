const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
  })
  
  user.association = (models) => {
    models.user.hasMany(models.Sale, {
      as: 'user_id',
      foreignKey: 'id'
    });
    models.user.hasMany(models.Sale, {
      as: 'seller_id',
      foreignKey: 'id'
    });
  }
  return user;
};