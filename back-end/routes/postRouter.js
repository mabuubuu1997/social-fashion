const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const user = require("../middleware/user")

router.get('/getPosts', user, postCtrl.getPosts)
router.post('/createPost', user, postCtrl.createPost)
router.patch('/updatePost/:id',user,  postCtrl.updatePost)
router.delete('/deletePost/:id',user, postCtrl.deletePost)
router.get('/getPost/:id',user, postCtrl.getPost)
router.get('/authPost/:id', postCtrl.getAuthPost)

module.exports = router;
