'use strict'

const { Model, DataTypes } = require('sequelize')

class Role extends Model { }

Role.initialize = function (sequelize) {
    Role.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        type: { type: DataTypes.TEXT, allowNull: false, unique: true }
    },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'Roles'
        })
}

Role.associate = function (models) {

    Role.hasMany(models.User, { foreignKey: 'roleId' })
}

module.exports = Role