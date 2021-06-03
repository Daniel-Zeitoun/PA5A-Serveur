'use strict'

const { Model, DataTypes } = require('sequelize')

class Screenshot extends Model { }

Screenshot.initialize = function (sequelize) {
    Screenshot.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        filename: { type: DataTypes.TEXT, allowNull: false, unique: true }
    },
        {
            sequelize,
            modelName: 'Screenshot',
            tableName: 'Screenshots'
        })
}

Screenshot.associate = function (models) {

    Screenshot.belongsTo(models.Client, { foreignKey: 'fk_clientId' })
}

module.exports = Screenshot