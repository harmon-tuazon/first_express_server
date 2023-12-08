const express = require('express');
const {authCheck} = require('../controllers/userController.js')
const { getMessageBoard } = require('../controllers/chatController.js')

const router = express.Router();

router.get('/', authCheck, getMessageBoard)




module.exports = router;