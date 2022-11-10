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

}

module.exports = comment_controller
