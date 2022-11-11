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

}

module.exports = product_controller