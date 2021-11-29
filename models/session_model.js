const {Model ,DataTypes, Table, Column} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require("../service/dao");
const User = require('./user_model');

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            key: User.id
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Session'
    }
);

Session.belongsTo(User, {foreignKey: 'fk_userId'})

module.exports = Session