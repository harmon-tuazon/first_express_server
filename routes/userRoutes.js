const express = require('express');
const passport = require("passport");


const {  postCreateUser,
         getAuthUser, 
         getLogOut, 
         getUserProfile,
         postUpdateProfile
                            } = require('../controllers/userController.js')

const router = express.Router();

router.post('/', postCreateUser)

router.get('/login', getAuthUser)

router.post('/login', passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login"
}))

router.get('/google', passport.authenticate("google", {scope: ['profile', 'email']}))

router.get('/google/redirect', passport.authenticate("google",  {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/facebook', passport.authenticate("facebook", {scope: ['email', 'public_profile']}))

router.get('/facebook/redirect', passport.authenticate("facebook",  {
    successRedirect: '/',
    failureRedirect: '/login'
}))

router.get('/logout', getLogOut)

router.get('/:id', getUserProfile)

router.post('/:id', postUpdateProfile)



module.exports = router;