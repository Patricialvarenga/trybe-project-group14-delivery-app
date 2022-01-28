module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      field:'url_image'
    },
  },{
    timestamps: false,
  })

  return product;
};