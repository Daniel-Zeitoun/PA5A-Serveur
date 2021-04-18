'use strict'

const { Model, DataTypes } = require('sequelize')

class Roles extends Model { }

Roles.initialize = function (sequelize) {
    Roles.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userType: { type: DataTypes.TEXT, allowNull: false, unique: true }
    },
        {
            sequelize,
            modelName: 'Roles'
        })
}

module.exports = Roles