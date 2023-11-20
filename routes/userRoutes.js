const express = require('express');
const passport = require("passport");


const { postCreateUser,
         getUsers, 
         getAuthUser, 
         getLogOut } = require('../controllers/userController.js')

const router = express.Router();

router.get('/', getUsers)

router.post('/', postCreateUser)

router.get('/login', getAuthUser)

router.post('/login', passport.authenticate("local", {
    successRedirect: "/users/login",
    failureRedirect: "/users/login"
}))

router.get('/google', passport.authenticate("google", {scope: ['profile, email']}))

router.get('/google/redirect', (res, req) => {
    res.redirect('/')
})


  
router.get('/logout', getLogOut)

module.exports = router;