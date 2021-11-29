const {Model ,DataTypes, Table, Column} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require("../service/dao");
const User = require('./user_model');
const Post = require('./post_model')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageName: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize: sequelize,
        modelName: 'Comment'
    }
);

Comment.belongsTo(User)
Comment.belongsTo(Post)
User.hasMany(Comment)
Post.hasMany(Comment)

module.exports = Comment