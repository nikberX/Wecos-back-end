const ApiError = require('../exceptions/api_error')
const userService = require('../service/user_service')

class UserController {
    async register(req, res, next) {
        try{
            const email = req.body.email
            const username = req.body.username
            const password = req.body.password
            var tokens = await userService.register(email, username, password)
            res.json({'ok' : true, "result" : tokens})
        } catch (e) {
            console.log('catch')
            next(e)
        }
    }

    async login(req, res, next) {
        try{
            const email = req.body.email
            const password = req.body.password
            const result = await userService.login(email, password);
            res.json({
                "ok" : true,
                "result" : result
            })
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try{

        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try{
            var authHeader = req.get("Authorization")
            var token
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7, authHeader.length);
            } else {
                throw new ApiError(401, 'Missing authorization', [])
            }

            var result = await userService.refreshToken(token)

            res.json({
                'ok' : true,
                'result' : result
            })
        } catch (e) {
            next(e)
        }
    }

    async profile(req, res, next) {
        try {
            var authHeader = req.get("Authorization")
            var token
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7, authHeader.length);
            } else {
                throw new ApiError(401, 'Missing authorization', [])
            }
            var user = await userService.profile(token)
            
            res.json({
                'ok' : true,
                'user' : user
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();