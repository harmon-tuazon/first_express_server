const express = require('express');
const {authCheck} = require('../controllers/userController.js')
const { getChatBoard, 
        getMessages,
        postCreateRoom } = require('../controllers/chatController.js')

const router = express.Router();

router.get('/', authCheck, getChatBoard);

router.get('/:id', authCheck, getMessages);

router.post('/', authCheck, postCreateRoom)



module.exports = router;