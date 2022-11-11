const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const user = require("../middleware/user")

router.post('/createProduct', user, productCtrl.createProduct)

module.exports = router;
