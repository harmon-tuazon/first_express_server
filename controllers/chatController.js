const Chat = require('../models/chats');

const getMessageBoard = (req, res) => {
    Chat.find()
    .then((result) => {res.render('messageBoard', { chatboxes: result, title: "Messages" })})
    .catch((err) => {console.error(err)})
}

module.exports = {
    getMessageBoard, 
}