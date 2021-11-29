const {Model ,DataTypes, Op} = require('sequelize')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Comment = require('../models/coment_model')
const ApiError = require('../exceptions/api_error')
const Session = require('../models/session_model')
const bcrypt = require('bcrypt')
const tokenService = require('./token_service')

class PostService {
    async post(postId) {
        const post = await Post.findOne(
        {
            id: postId,
            attributes: {exclude: ['UserId']},
            include: [
                {
                    model: User,
                    attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'email']},
                },
                {
                    model: Comment,
                    attributes: {exclude: ['updatedAt', 'PostId', 'UserId']},
                    include: [{
                        model: User,
                        attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'email']}
                    }]
                }
            ]
        }
    )

        return post;
    }

    async posts(limit, offset) {
        const posts = await Post.findAndCountAll({
            limit: limit,
            offset: offset
        })

        return posts;
    }

    async createPost(token, title, content, imageName) {
        if (token == null) throw new ApiError(401, 'Unauthorized')

        const userId = tokenService.checkAccessToken(token)

        if (userId == null) throw new ApiError(401, 'Unauthorized')

        const post = await Post.create({
            'UserId' : userId,
            'title' : title,
            'content' : content,
            'imageName' : imageName
        })

        return post.getDataValue('id')
    }

    async profile(token) {
        
        if (token === null) throw new ApiError(401, 'Unauthorized',[])

        var userId = tokenService.checkAccessToken(token)
        
        if (userId === null) throw new ApiError(401, 'Unauthorized', [])
        var user = await User.findByPk(userId)

        return user
    }
}

module.exports = new PostService()