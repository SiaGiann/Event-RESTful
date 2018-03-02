'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        title: 'Party',
        start_date: '2018-01-25',
        end_date: '2018-02-01',
        description: 'Bday party',
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      },
      {
        title: 'Party vol 2!!!',
        start_date: '2018-04-25',
        end_date: '2018-05-01',
        description: 'Nameday party',
        createdAt: 'NOW()',
        updatedAt: 'NOW()'
      }
    ]);
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
