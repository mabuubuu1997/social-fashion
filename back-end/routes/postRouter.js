const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const user = require("../middleware/user")

router.get('/getPosts', user, postCtrl.getPosts)
router.post('/createPost', user, postCtrl.createPost)
router.patch('/updatePost/:id',user,  postCtrl.updatePost)
router.delete('/deletePost/:id',user, postCtrl.deletePost)
router.get('/getPost/:id',user, postCtrl.getPost)
router.get('/authPost/:id', postCtrl.getAuthPost)
router.patch('/updatePost/:id/like',user, postCtrl.likePost)
router.patch('/updatePost/:id/unlike',user, postCtrl.unLikePost)
module.exports = router;
