const {Model ,DataTypes, Op} = require('sequelize')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const ApiError = require('../exceptions/api_error')
const Comment = require('../models/coment_model')
const bcrypt = require('bcrypt')
const tokenService = require('./token_service')

class CommentService {

    async createPost(token, title, content, imageName) {
        if (token == null) throw new ApiError(401, 'Unauthorized')

        const userId = tokenService.checkAccessToken(token)

        if (userId == null) throw new ApiError(401, 'Unauthorized')


        const post = await Post.create({
            'ownerId' : userId,
            'title' : title,
            'content' : content,
            'imageName' : imageName
        })

        return post.getDataValue('id')
    }

    async createComment(token, postId, content, imageName) {
        if (token == null) throw new ApiError(401, 'Unauthorized')

        const userId = tokenService.checkAccessToken(token)

        if (userId == null) throw new ApiError(401, 'Unauthorized')

        const post = await Post.findByPk(postId)

        if (!post) throw new ApiError(400, 'Bad payload', [])

        const comment = await Comment.create({
            'PostId' : postId,
            'UserId' : userId,
            'content' : content,
            'imageName' : imageName
        })

        return true
    }
}

module.exports = new CommentService()