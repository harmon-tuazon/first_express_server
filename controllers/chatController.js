const Chat = require('../models/chats');

const getChatBoard = (req, res) => {
    Chat.find()
    .then((result) => {res.render('messageBoard', { chatboxes: result, title: "Messages", chat: null,})})
    .then(data => console.log(data))
    .catch((err) => {console.error(err)})
}

const getMessages = (req, res) => {
    Chat.find()
    .then((result) => {res.render('messageBoard', { chatboxes: result, title: "Messages", chat: result.messages })})
    .catch((err) => {console.error(err)})
}

const postCreateRoom = (req, res) => {
    const newChatRoom = new Chat({
                            ...req.body,
                        })

    newChatRoom.save()
    .then((result) => {res.redirect('/messages')})
    .catch((err) => {console.error(err)}) 
}

module.exports = {
    getChatBoard, 
    getMessages,
    postCreateRoom
}