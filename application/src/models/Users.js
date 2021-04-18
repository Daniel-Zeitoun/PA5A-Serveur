'use strict'

const { Model, DataTypes } = require('sequelize')

class Users extends Model { }

Users.initialize = function (sequelize) {
    Users.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        pseudo: { type: DataTypes.TEXT, allowNull: false, unique: false },
        password: { type: DataTypes.TEXT, allowNull: false, unique: false },
        lastLogin: { type: DataTypes.DATE, allowNull: false, unique: false },
        role: { type: DataTypes.INTEGER, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Users'
        })
}

module.exports = Users