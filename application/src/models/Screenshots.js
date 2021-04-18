'use strict'

const { Model, DataTypes } = require('sequelize')

class Screenshots extends Model { }

Screenshots.initialize = function (sequelize) {
    Screenshots.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        filename: { type: DataTypes.TEXT, allowNull: false, unique: true },
        createdDate: { type: DataTypes.DATE, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Screenshots'
        })
}

module.exports = Screenshots