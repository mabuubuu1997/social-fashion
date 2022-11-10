const router = require('express').Router()
const comment_controller = require('../controllers/commentCtrl')
const user = require("../middleware/user")

router.post('/comment', user, comment_controller.createComment)
router.patch('/comment/:id', user, comment_controller.updateComment)
router.delete('/comment/:id', user, comment_controller.deleteComment)
router.patch('/comment/:id/like', user, comment_controller.likeCommentPost)
router.patch('/comment/:id/unlike', user, comment_controller.unLikeCommentPost)

module.exports = router