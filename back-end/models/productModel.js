const mongoose = require('mongoose')

const product_schema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    description: {        
        type: String,
        required: true,
    },
    creator: String,
    userId: String,
    quantity: Number,
    createAt: {
        type: Date,
        default: new Date(),
    },
    user: {
        type: mongoose.Types.ObjectId, 
        ref: 'user'
    },
    images: {
        type: Array,
        require: true,
    },
},{
        timestamps: true 
});

module.exports = mongoose.model("products", product_schema )