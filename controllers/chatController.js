const Chat = require('../models/chats');

const setChatRoomResVariable = async (req, res, next) => {
    const userID = req.user._id.toString()
    let chatrooms = await  Chat.find({user_id: userID})

    try{
        res.locals.chatboxes = chatrooms; 
        next();
    } catch(err) {
        throw new Error(err)
    }
 
}

const getChatRooms = (req, res) => {
    res.render('messageBoard', {title: "Messages", chat: null})
}

const getMessages = (req, res) => {
    const id = req.params.id
  
    Chat.findById(id)
     .then((result) => {res.render('messageBoard', { title: "Messages", chat: result })})
     .catch((err) => {console.error(err)})
}

const postCreateRoom = (req, res) => {
    const newChatRoom = new Chat({
                            ...req.body,
                            user_id: req.user._id
                        })

    newChatRoom.save()
    .then((result) => {res.redirect('/messages')})
    .catch((err) => {console.error(err)}) 
}

const postSendMessage = async (req, res) => {
    const id = req.params.id
    const replace = {
                    author: req.user.firstname,
                    content: req.body.messages,
                    createdAt: new Date()
                    }  
    
    if (req.body.messages !== "") {
        const newMessage = await Chat.findByIdAndUpdate(id, {$push: {messages: replace}}, { new: true })
     
        try {
            res.redirect(`/messages/${id}`)
        }
        catch(err) {
            throw new Error(err)
        }
    } else {
        return 
    }
}

module.exports = {
    setChatRoomResVariable, 
    getChatRooms,
    getMessages,
    postCreateRoom,
    postSendMessage
}