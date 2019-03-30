'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {username: 'userName1', password: 'qwerty', email: 'user1@gmail.com'},
            {username: 'userName2', password: 'password', email: 'user2@gmail.com'}
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
