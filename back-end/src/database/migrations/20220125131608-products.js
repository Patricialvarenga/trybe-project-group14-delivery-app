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
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'create_at',
        defaultValue: Sequelize.fn('now')
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'update_at',
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
