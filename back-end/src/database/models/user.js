const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  
  User.association = (models) => {
    models.User.hasMany(models.Sale, {
      as: 'user_id',
      foreignKey: 'id'
    });
    models.User.hasMany(models.Sale, {
      as: 'seller_id',
      foreignKey: 'id'
    });
  }
  return User;
};