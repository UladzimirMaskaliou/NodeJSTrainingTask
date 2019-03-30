'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product', {
        name: DataTypes.STRING
    }, {timestamps: false});
    Product.associate = function(models) {
      // associations can be defined here
    };
    return Product;
};