const {Model ,DataTypes, Table, Column} = require('sequelize')
const bcrypt = require('bcrypt')
//const sequelize = require('../service/dao').sequelize
const sequelize = require("../service/dao")

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            get() {
                return this.getDataValue('id')
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('password')
            },
            set(value) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash)
            }
        }
    }, 
    {
        sequelize: sequelize,
        modelName: 'User'
    }
);

module.exports = User