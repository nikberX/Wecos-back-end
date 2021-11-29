const Router = require('express').Router
const userController = require('../controllers/user_controller')
const postController = require('../controllers/post_controller')
const commentController = require('../controllers/comment_controller')
const router = new Router()

router.post('/auth/sign-up', userController.register)
router.post('/auth/sign-in', userController.login)
router.post('/auth/refresh-token', userController.refresh)
router.get('/profile/me', userController.profile)
router.post('/posts/create-post', postController.createPost)
router.get('/posts', postController.posts)
router.get('/posts/:postId', postController.post)
router.post('/posts/:postId/create-comment', commentController.createComment)

module.exports = router