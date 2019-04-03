'use strict';
module.exports = (sequelize, DataTypes) =>
    sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING
    }, {timestamps: false});