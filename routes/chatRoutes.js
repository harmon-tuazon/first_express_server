const express = require('express');
const {authCheck} = require('../controllers/userController.js')
const { setChatRoomResVariable, 
        getChatRooms,
        getMessages,
        postCreateRoom, 
        postSendMessage} = require('../controllers/chatController.js')

const router = express.Router();

router.get('/', authCheck, setChatRoomResVariable, getChatRooms);

router.post('/', authCheck, postCreateRoom)

router.get('/:id', authCheck, setChatRoomResVariable, getMessages);

router.post('/:id', authCheck, setChatRoomResVariable, postSendMessage )




module.exports = router;