'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    productId: DataTypes.STRING,
    description: DataTypes.STRING
  }, {timestamps: false});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};