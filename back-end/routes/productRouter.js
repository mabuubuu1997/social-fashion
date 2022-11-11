const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const user = require("../middleware/user")

router.post('/createProduct', user, productCtrl.createProduct)
router.get('/getProducts', user, productCtrl.getProducts)
router.get('/authProduct/:id', productCtrl.getAuthProduct)
router.patch('/updatePost/:id',user,  productCtrl.updateProduct)
router.delete('/deletePost/:id',user, productCtrl.deleteProduct)

module.exports = router;
