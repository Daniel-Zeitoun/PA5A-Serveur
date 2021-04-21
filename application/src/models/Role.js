'use strict'

const { Model, DataTypes } = require('sequelize')

class Role extends Model { }

Role.initialize = function (sequelize) {
    Role.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userType: { type: DataTypes.TEXT, allowNull: false, unique: true }
    },
        {
            sequelize,
            modelName: 'Role'
        })
}

Role.associate = function (models) {
    
    Role.hasMany(models.User, {
        foreignKey: 'role'
    })
}

module.exports = Role