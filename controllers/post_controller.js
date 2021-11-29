const ApiError = require('../exceptions/api_error')
const postService = require('../service/post_service')

class PostController {
    async posts(req, res, next) {
        try{
            const limit = req.query.limit
            const offset = req.query.offset

            const posts = await postService.posts(limit, offset)
            
            res.json({'ok' : true, "result" : posts})
        } catch (e) {
            next(e)
        }
    }

    async post(req, res, next) {
        try{
            const postId = req.params.postId
            const result = await postService.post(postId)
            res.json({
                "ok" : true,
                "result" : result
            })
        } catch (e) {
            next(e)
        }
    }

    async createPost(req, res, next) {
        try{
            var authHeader = req.get("Authorization")
            var token
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7, authHeader.length);
            } else {
                throw new ApiError(401, 'Missing authorization', [])
            }
            const title = req.body.title
            const content = req.body.content
            const imageName = req.body.imageName
            const postId = await postService.createPost(token, title, content, imageName)
            
            res.json({
                'ok' : true,
                'postId' : postId
            })
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

module.exports = new PostController();