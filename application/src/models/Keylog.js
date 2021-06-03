'use strict'

const { Model, DataTypes } = require('sequelize')

class Keylog extends Model { }

Keylog.initialize = function (sequelize) {
    Keylog.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        jsonData: { type: DataTypes.JSON, allowNull: true, unique: false }
    },
        {
            sequelize,
            modelName: 'Keylog',
            tableName: 'Keylogs'
        })
}

Keylog.associate = function (models) {

    Keylog.belongsTo(models.Client, { foreignKey: 'fk_clientId' })
}

module.exports = Keylog