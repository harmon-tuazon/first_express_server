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
<<<<<<< HEAD
    },
    user_id: {
        type: String,
        required: false
=======
>>>>>>> 18c6f66d79ecc1ed963f9842fa06e8ca7172e4c0
    }

}, {timestamps: true})

    const Blog = mongoose.model('Blog', blogSchema);
    
    module.exports = Blog;

