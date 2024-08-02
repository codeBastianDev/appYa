'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Commerces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      mail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      photo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      openTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      closeTime: {
        allowNull: false,
        type: Sequelize.TIME
      },
      isActive: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      idTypeCommerce: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TypeCommerces', // Nombre de la tabla referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Commerces');
  }
};
