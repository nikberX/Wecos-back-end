const jwt = require('jsonwebtoken');
const ApiError = require('../exceptions/api_error');

class TokenService {
    generateToken(payload) {
        const access = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '60m'})
        const refresh = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '10d'})

        console.log('created access: ')
        console.log(access)
        return {
            'access' : access,
            'refresh' : refresh
        }
    }

    checkAccessToken(token) {
        try {
            const valid = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return valid['userId']
        } catch (e) {
            throw new ApiError(401, 'Unauthorized', [])
        }
    }

    checkRefreshToken(token) {
        try {
            const valid = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return valid['userId']
        } catch (e) {
            throw new ApiError(401, 'Unauthorized', [])
        }
    }
}

module.exports = new TokenService()