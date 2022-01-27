module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    url_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },{
    timestamp: false,
  })

  return Product;
};