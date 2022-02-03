const md5 = require('md5');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    User.hasMany(models.sale, {
      as: 'userId',
      foreignKey: 'id'
    });
    User.hasMany(models.sale, {
      as: 'sellerId',
      foreignKey: 'id'
    });
  }
  return User;
};