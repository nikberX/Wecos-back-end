const {Model ,DataTypes, Table, Column} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require("../service/dao");
const User = require('./user_model');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // ownerId: {
        //     type: DataTypes.UUID,
        //     key: User.id
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        imageName: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Post'
    }
);

Post.belongsTo(User)
User.hasMany(Post)

module.exports = Post