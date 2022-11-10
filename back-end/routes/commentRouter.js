const router = require('express').Router()
const comment_controller = require('../controllers/commentCtrl')
const user = require("../middleware/user")

router.post('/comment', user, comment_controller.createComment)
router.patch('/comment/:id', user, comment_controller.updateComment)
router.delete('/comment/:id', user, comment_controller.deleteComment)

module.exports = router