'use strict'

const { Model, DataTypes } = require('sequelize')

class User extends Model { }

User.initialize = function (sequelize) {
    User.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.TEXT, allowNull: false, unique: false },
        password: { type: DataTypes.TEXT, allowNull: false, unique: false },
        lastLogin: { type: DataTypes.DATE, allowNull: false, unique: false }
    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users'
        })
}

User.associate = function (models) {

    User.belongsTo(models.Role, { foreignKey: 'roleId' })
    User.hasMany(models.Command, { foreignKey: 'userId' })
}

module.exports = User