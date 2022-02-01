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
    tableName: 'users',
    underscored:true
  })
  
  User.association = (models) => {
    models.User.hasMany(models.Sale, {
      as: 'userId',
      foreignKey: 'id'
    });
    models.User.hasMany(models.Sale, {
      as: 'sellerId',
      foreignKey: 'id'
    });
  }
  return User;
};