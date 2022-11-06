const PostModel = require('../models/postModel')


const post_controller = {

    createPost: async(req, res) =>{
        try{
            const {title, message, images, tags} = req.body
            if(images.length === 0 ) return res.status(400).json({msg:'Please input your picture!'})
            let newData = {images, tags, title, message, creator:req.user.name, userId:req.user.id}

            const new_post_data = new PostModel(newData)
            await new_post_data.save();

            res.status(200).json(new_post_data);
        } catch (err){
            res.status(400).json({msg: err.message});
        }
    },


}

module.exports = post_controller