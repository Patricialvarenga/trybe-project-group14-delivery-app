const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isMD5: true, 
      },
      set(value){
        this.setDataValue('senha', md5(value))
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isIn: [['custumer', 'seller', 'administrator']]
      }
    },
  },{
    timestamp: true,
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
  return User;
  }
};