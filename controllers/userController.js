const User = require('../models/users');

const postCreateUser = (req, res) => {
    const newUser = new User(req.body)

    newUser.save()
    .then((result) => {res.redirect('/users')})
    .catch((err) => {console.error(err)}) 
}

const getUsers = (req, res) => {
    User.find()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)})
}

module.exports = {
   postCreateUser,
   getUsers
}