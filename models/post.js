const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    locationName:{
        type: String,
        required: true
    },
    locationDetails:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    likeCount:{
        type: Number,
        default: 0
    },
    city:{
        type: String,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema)