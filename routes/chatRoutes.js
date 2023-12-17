const express = require('express');
const {authCheck} = require('../controllers/userController.js')
const { getChatBoard, getMessages } = require('../controllers/chatController.js')

const router = express.Router();

router.get('/', authCheck, getChatBoard);

router.get('/:id', authCheck, getMessages);



module.exports = router;