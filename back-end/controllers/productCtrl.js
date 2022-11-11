const ProductModel = require('../models/productModel')

const product_controller = {

    createProduct: async(req, res) =>{
        try{
            const {name, description, images, quantity} = req.body
            if(images?.length === 0 ) return res.status(400).json({msg:'Please input your picture!'})
            if(!name) return res.status(400).json({msg:'Please input your name product!'})

            let newData = {
                name, description, images, quantity, creator:req.user.name, userId:req.user.id
            }

            const new_product = new ProductModel(newData)
            await new_product.save();

            res.status(200).json(new_product);
        } catch (err){
            res.status(400).json({msg: err.message});
        }
    },

    getProducts: async (req, res) => {
        try {

            const product = await ProductModel.find(
                req.user._id
            ).sort('-createdAt')
            .populate("user","avatar name")
            res.status(200).json(product);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    },

    getAuthProduct: async(req, res) => {
        try {
            const product_auth = await ProductModel.find({userId: req.params.id}).sort('createdAt')

            res.json({product_auth})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },


}

module.exports = product_controller