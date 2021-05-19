const mongoose = require('mongoose');
const db = mongoose.models;

const likeSchema = new mongoose.Schema(
    {
        total_likes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: false }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
