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
        required: false
    }

}, {timestamps: true})

    const Blog = mongoose.model('Blog', blogSchema);
    
    module.exports = Blog;
