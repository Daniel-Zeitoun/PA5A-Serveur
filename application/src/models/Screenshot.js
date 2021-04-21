'use strict'

const { Model, DataTypes } = require('sequelize')

class Screenshot extends Model { }

Screenshot.initialize = function (sequelize) {
    Screenshot.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        fk_clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false },
        filename: { type: DataTypes.TEXT, allowNull: false, unique: true },
        createdDate: { type: DataTypes.DATE, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Screenshot'
        })
}

Screenshot.associate = function (models) {

    Screenshot.belongsTo(models.Client, {
        foreignKey: 'fk_clientId'
    })
}

module.exports = Screenshot