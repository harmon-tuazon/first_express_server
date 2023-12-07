const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: false
    },
    dislikes: {
        type: Number,
        required: false
    }

}, {timestamps: true})

    const Blog = mongoose.model('Blog', blogSchema);
    
    module.exports = Blog;

