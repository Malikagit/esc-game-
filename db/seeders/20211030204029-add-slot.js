'use strict';
// const moment = require('moment-timezone');

// let time = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'slots',
      [
        {
          during: `[2010-01-01 14:30, 2010-01-01 15:30)`,
          roomId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          roomId: 1,
          during: `[2010-01-05 14:30, 2010-01-06 15:30)`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          during: `[2022-01-30 14:30, 2022-01-30 15:30)`,
          roomId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          roomId: 1,
          during: `[2022-02-06 14:30, 2022-02-06 15:30)`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          roomId: 1,
          during: `[2022-03-06 14:30, 2022-03-06 15:30)`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
