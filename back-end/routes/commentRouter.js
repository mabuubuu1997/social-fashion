const router = require('express').Router()
const comment_controller = require('../controllers/commentCtrl')
const user = require("../middleware/user")

router.post('/comment', user, comment_controller.createComment)

module.exports = router