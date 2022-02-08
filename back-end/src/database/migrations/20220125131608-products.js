'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },
      urlImage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
        field:'url_image'
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
