const mongoose = require('mongoose')

const comment_schema = new mongoose.Schema({
    
    postId: mongoose.Types.ObjectId,
    postUserId: mongoose.Types.ObjectId,
    reply: mongoose.Types.ObjectId,
    content: {
        type: String,
        required: true,
        
    },
    likes: [{type: mongoose.Types.ObjectId, ref: 'user'}],
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    tag: Object,
    

}, {
    timestamps: true
})

module.exports = mongoose.model('comment', comment_schema)