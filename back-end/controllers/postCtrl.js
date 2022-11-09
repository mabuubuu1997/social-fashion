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

    getPosts: async (req, res) => {
        try {

            const postMessages = await PostModel.find(
                req.user._id
            ).sort('-createdAt')
            .populate("user likes","avatar name")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            });
            res.status(200).json(postMessages);
        } catch (err) {
            res.status(404).json({msg: err.message});
        }
    },
    updatePost: async(req, res) =>{
        try
        {
            const ObjectId = require('mongoose').Types.ObjectId
            const { id } = req.params;
            const { title, message, creator, images, tags } = req.body;
        
            if (!ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
            const updatedPost = { creator, title, message, tags, images, _id: id };
    
            await PostModel.findByIdAndUpdate(id, updatedPost)
            .populate("user likes", "avatar name")
            .populate({
                path: "comment",
                populate: {
                    path: "user likes",
                    select: "comment"
                }
            });
    
            res.json({
                updatedPost: {...updatedPost._doc,
                title, message, tags, images}});
        } catch(err){
            res.status(400).json({msg: err.message});
        }
    },

    deletePost: async(req, res) => {
        try {
            await PostModel.findOneAndDelete({_id: req.params.id, post:req.user._id});
            res.json({ message: "Post deleted successfully." });
        } catch (err) {
            res.status(400).json({msg: err.message});
        }
    },

    getAuthPost: async(req, res) => {
        try {
            const post_auth = await PostModel.find({userId: req.params.id}).sort('createdAt')

            res.json({post_auth})
        } catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },

    getPost: async(req, res) => {
        try{
            const id = req.params.id

            const post_data = await PostModel.findById(id).populate('user likes', 'avatar name').populate({
                path: 'comments',
                populate: {
                    path: 'user likes',
                    select: '-password'
                }
            })
            
            res.status(200).json({post_data})
        } catch (error) {
            res.status(400).json({msg: err.message})
        }
    }


}

module.exports = post_controller