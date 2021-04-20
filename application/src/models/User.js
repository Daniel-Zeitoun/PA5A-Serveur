'use strict'

const { Model, DataTypes } = require('sequelize')

class User extends Model { }

User.initialize = function (sequelize) {
    User.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.TEXT, allowNull: false, unique: false },
        password: { type: DataTypes.TEXT, allowNull: false, unique: false },
        lastLogin: { type: DataTypes.DATE, allowNull: false, unique: false },
        role: { type: DataTypes.INTEGER, allowNull: false, unique: false, references: { model: 'Role', key: 'id' } }
    },
        {
            sequelize,
            modelName: 'User'
        })
}

User.associate = function (models) {
    
    User.belongsTo(models.Role, {
        foreignKey: 'role'
    })
}

module.exports = User