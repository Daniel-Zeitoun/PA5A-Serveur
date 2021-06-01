'use strict'

const { Model, DataTypes } = require('sequelize')

class Log extends Model { }

Log.initialize = function (sequelize) {
    Log.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        jsonData: { type: DataTypes.JSON, allowNull: true, unique: false },
        fk_clientId: { type: DataTypes.INTEGER, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Log',
            tableName: 'Logs'
        })
}

Log.associate = function (models) {

    Log.belongsTo(models.Client, { foreignKey: 'fk_client' })
}

module.exports = Log