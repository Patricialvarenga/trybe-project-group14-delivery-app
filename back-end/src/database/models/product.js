module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
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
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
  },{
    timestamps: false,
    tableName: 'products',
    underscored:true
  })

  return Product;
};