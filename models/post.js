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
    username:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    city:{
        type: String,
        required: true
    },

}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema)