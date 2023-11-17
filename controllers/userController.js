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

const getAuthUser = (req, res) => {
   res.render('login', { title: "Log in", user: req.user})
}

const getLogOut = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
        });
    }
module.exports = {
   postCreateUser,
   getUsers,
   getAuthUser,
   getLogOut
}