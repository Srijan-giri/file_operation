'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('fileUpload', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      filename: {
        type: Sequelize.STRING
      },
      original_file_name: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }

    })
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('fileUpload');
  }
};
