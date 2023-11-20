const User = require('../models/users');
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

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

passport.use(
    new LocalStrategy(async (username, password, cb) => {
          try {
              const user = await User.findOne({ username: username });
      
          if (!user) {
              return cb(null, false, { message: "Incorrect username" });
          };
          if (user.password !== password) {
               return cb(null, false, { message: "Incorrect password" });
          };
      
          return cb(null, user);
          } catch(err) {
              return cb(err);
          }})
  );
      
passport.serializeUser((user, cb) => {
      cb(null, user._id);
  });
            
passport.deserializeUser(async (id, cb) => {
      try {
          const user = await User.findById(id);
          cb(null, user);
                
      } catch(err) {
          cb(err);
      };
});
module.exports = {
   postCreateUser,
   getUsers,
   getAuthUser,
   getLogOut
}