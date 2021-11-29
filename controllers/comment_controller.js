const ApiError = require('../exceptions/api_error');
const CommentService = require('../service/comment_service')

class CommentController {

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
            const result = await postService.createPost(token, title, content, imageName)
            
            res.json({
                'ok' : result
            })
        } catch (e) {
            next(e)
        }
    }

    async createComment(req, res, next) {
        try {
            var authHeader = req.get("Authorization")
            var token
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7, authHeader.length);
            } else {
                throw new ApiError(401, 'Missing authorization', [])
            }
            const content = req.body.content
            const imageName = req.body.imageName
            const postId = req.params.postId

            const result = await CommentService.createComment(token, postId, content, imageName)
            res.json({
                 'ok' : true,
                 'result' : result
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new CommentController();