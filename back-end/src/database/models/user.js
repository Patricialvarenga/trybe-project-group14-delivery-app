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
  
  User.associate = (models) => {
    User.hasMany(models.sale, {
      as: 'orders',
      foreignKey: 'userId'
    });
    User.hasMany(models.sale, {
      as: 'sales',
      foreignKey: 'sellerId'
    });
  }
  return User;
};