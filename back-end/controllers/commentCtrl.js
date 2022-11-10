const Model_Comments = require('../models/model_comment')
const Model_Posts = require('../models/model_postMessage')

const comment_controller = {
    createComment: async (req, res) => {
        try {
            const { postId, content, tag, reply, postUserId } = req.body
            const new_post = await Model_Posts.findById(postId)
            if(!new_post) return res.status(400).json({msg: "Can not Load Post because it does not exist."})


            const new_comment = new Model_Comments({
                user: req.user._id, content, tag, reply, postUserId, postId
            })

            await Model_Posts.findOneAndUpdate({_id: postId}, {
                $push: {comments: new_comment.id}
            }, {new: true})

            await new_comment.save()

            res.json({new_comment})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateComment: async (req, res) => {
        try {
            let content = req.body.content
            let id = req.params.id
            
            await Model_Comments.findOneAndUpdate({
                _id: id, user: req.user._id
            }, {content})

            res.json({msg: 'Update Success!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteComment: async (req, res) => {
        try {
            let id = req.params.id

            const comment = await Model_Comments.findOneAndDelete({
                _id: id,
                $or: [
                    {user: req.user._id},
                    {postUserId: req.user._id}
                ]
            })

            await Model_Posts.findOneAndUpdate({_id: comment.postId}, {
                $pull: {comments: id}
            })

            res.json({msg: 'Deleted Comment!'})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}

module.exports = comment_controller
