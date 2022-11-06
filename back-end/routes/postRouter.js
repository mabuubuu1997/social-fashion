const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const user = require("../middleware/user")

router.get('/getPosts', user, postCtrl.getPosts)

router.post('/createPost', user, postCtrl.createPost)

module.exports = router;
