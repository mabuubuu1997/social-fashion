const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");
const user = require("../middleware/user")
const admin = require("../middleware/admin")

router.post("/getAllUsersSystem",user, admin , userCtrl.getAllUsersSystem);
router.delete('/delete/:id', user, admin, userCtrl.deleteUser)

module.exports = router;
