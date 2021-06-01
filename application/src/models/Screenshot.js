'use strict'

const { Model, DataTypes } = require('sequelize')

class Screenshot extends Model { }

Screenshot.initialize = function (sequelize) {
    Screenshot.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        filename: { type: DataTypes.TEXT, allowNull: false, unique: true },
        fk_client: { type: DataTypes.INTEGER, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Screenshot',
            tableName: 'Screenshots'
        })
}

Screenshot.associate = function (models) {

    Screenshot.belongsTo(models.Client, { foreignKey: 'fk_client' })
}

module.exports = Screenshot