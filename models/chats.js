const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user_id1: {
        type: String,
        required: true,
    },
    user_id2: {
        type: String,
        required: true,
    },
    messages: [
        {
        author: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
        type: Date,
        default: new Date()
        }
    }
]
}, {timestamps: true})

    const Chat = mongoose.model('Chat', chatSchema);
    
    module.exports = Chat;