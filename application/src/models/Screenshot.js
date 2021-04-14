'use strict'

const { Model, DataTypes } = require('sequelize')

class Screenshot extends Model { }

Screenshot.initialize = function (sequelize) {
    Screenshot.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        filename: { type: DataTypes.TEXT, allowNull: false, unique: true },
        createdDate: { type: DataTypes.DATE, allowNull: false, unique: false },
    },
        {
            sequelize,
            modelName: 'Screenshot'
        })
}

module.exports = Screenshot