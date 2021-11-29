const {Model ,DataTypes, Op} = require('sequelize')
const User = require('../models/user_model')
const ApiError = require('../exceptions/api_error')
const Session = require('../models/session_model')
const bcrypt = require('bcrypt')
const tokenService = require('./token_service')

class UserService {
    async register(email, username, password) {
        const candidate = await User.findOne({
            where: {
                email: {[Op.iLike] : email}
            }
        })
        if (candidate) {
            throw new ApiError(400, 'Already exist', [])
        }
        const newUser = await User.create({
            email: email,
            username: username,
            password: password
        })
        var newUserId = newUser.getDataValue('id')
        const userSession = await Session.create({
            userId: newUserId,
            isActive: true
        })
        const tokens = tokenService.generateToken({
            'userId' : newUserId
        })
        return tokens
    }

    async login(email, password) {
        const candidate = await User.findOne({
            where: {
                email: {[Op.iLike] : email}
            }
        })
        if (!candidate) {
            throw new ApiError(401, 'Invalid credentials', [])
        }
        const areSame = await bcrypt.compare(password ,candidate.password)
        if (!areSame) {
            throw new ApiError(401, 'Invalid credentials', [])
        }
        const userId = await candidate.getDataValue('id')
        const tokens = tokenService.generateToken({
            'userId' : userId
        })
        const userSession = await Session.findOne({
            userId: userId,
        });
        if (!userSession.getDataValue('isActive')) {
            userSession.setDataValue('isActive', true)
        }

        return tokens;
    }

    async refreshToken(token) {
        if (token == null) throw new ApiError(401, 'Unauthorized')
        const userId = tokenService.checkRefreshToken(token)

        if (userId == null) throw new ApiError(401, 'Unauthorized')

        const userSession = await Session.findOne({where: {
            userId: userId
        }})

        if (!userSession.getDataValue('isActive')) 
            throw new ApiError(401, 'Unauthorized', [])
        
        const tokens = tokenService.generateToken({
            'userId' : newUserId
        })

        return tokens
    }

    async profile(token) {
        
        if (token === null) throw new ApiError(401, 'Unauthorized',[])

        var userId = tokenService.checkAccessToken(token)
        
        if (userId === null) throw new ApiError(401, 'Unauthorized', [])
        var user = await User.findByPk(userId)

        return user
    }
}

module.exports = new UserService()