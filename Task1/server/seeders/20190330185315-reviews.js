'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('reviews', [
            {productId: 'sku1', description: 'good'},
            {productId: 'sku1', description: 'not bad'},
            {productId: 'sku2', description: 'disgusting'}            
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('reviews', null, {});
    }
};