const User = require('../models/users');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const bcrypt = require('bcryptjs');
require('dotenv').config()


const postCreateUser =  (req, res) => {
    if (req.body.password === req.body.confirmpassword) {
     bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
        if (err) {
            console.log(err)
        } else {
        const newUser = new User(
            {   
                ...req.body,
                password: hashedPassword,
                confirmpassword: hashedPassword
            }
        )
      
        newUser.save()
        .catch((err) => {console.error(err)}) }
    })}
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

//Local Strategy
passport.use(
    new LocalStrategy(async (username, password, cb) => {
          try {
              const user = await User.findOne({ username: username });
              const match = await bcrypt.compare(password, user.password);
      
          if (!user) {
              return cb(null, false, { message: "Incorrect username" });
          };
          if (!match) {
               return cb(null, false, { message: "Incorrect password" });
          };
      
          return cb(null, user);
          } catch(err) {
              return cb(err);
          }})
  );
      
//Google Strategy
passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, cb) => {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
        });
  }
));

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