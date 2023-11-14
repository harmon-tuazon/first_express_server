const express = require('express');
const { postCreateUser, getUsers } = require('../controllers/userController.js')

const router = express.Router();

router.get('/', getUsers)

router.post('/', postCreateUser)

module.exports = router;