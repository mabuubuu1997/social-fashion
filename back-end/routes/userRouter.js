const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const user = require("../middleware/user")

router.get('/user/:id', user, userCtrl.getUserInfor)

router.patch('/update', user, userCtrl.updateUserInfor)

module.exports = router;
