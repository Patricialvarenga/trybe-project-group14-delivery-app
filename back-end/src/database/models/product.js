module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING,
  },{
    timestamp: false,
  })

  Product.association = (models) => {
    models.Product.hasMany(models.SalesProduct, {
      as: 'product_id',
      foreignKey: 'id'
    })
  }

  return Product;
};