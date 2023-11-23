const User = require('../models/users');
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy =  require('passport-facebook').Strategy;
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

const getAuthUser = (req, res) => {
   res.render('login', { title: "Log in"})
}

const getLogOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
        });
    }

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/users/login')
    } else {
        next()
    }
}

const getUserProfile = (req, res) => {
    const id = req.params.id

    User.findById(id)
    .then((result)=> { res.render('userProfile', { title: "User Profile", user: result })})
    .catch((err) => {throw new Error(err)})
   
}

const postUpdateProfile = (req, res) => {  
    const id = req.params.id

    if (req.body.password === req.body.confirmpassword) {
        bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
           if (err) {
              console.log(err)
           } else {
           const replace = {   
                   ...req.body,
                   password: hashedPassword,
                   confirmpassword: hashedPassword
                                                    }
         
           User.findByIdAndUpdate(id, replace, { new: true })
            .then(result => {res.redirect(`/users/${id}`) })
            .catch(err => {console.log(err);});
       }})

    } else {
        alert("Password and Confirm Password should match")
    }
}

//Local Strategy
passport.use(
    new LocalStrategy(async (username, password, cb) => {
          try {
              const user = await User.findOne({ username: username });
              const match = await bcrypt.compare(password, user.password);
      
          if (!user) {
              alert("Wrong username or password")
              return cb(null, false);
          };
          if (!match) {
               alert("Wrong username or password") 
               return cb(null, false);
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
        callbackURL: "http://localhost:3000/users/google/redirect"
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await User.findOne({username: profile._json.email})

            if (!user) {
                const newUser = new User({   
                        firstname: profile._json.given_name,
                        lastname: profile._json.family_name,
                        username: profile._json.email,
                        phonenumber: "",
                        password: profile._json.sub,
                        confirmpassword: "",
                     })
                     
                newUser.save()
            } else {
                return cb(null, user);
            }
        }  catch(err) {
        return cb(err);
        }
    })
);

//FB Strategy
passport.use(
    new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/users/facebook/redirect",
        profileFields: ['id', 'displayName', 'email']
    },
    async (accessToken, refreshToken, profile, cb) => {
        try {
            const user = await User.findOne({username: profile._json.email})

            if (!user) {
                const newUser = new User({   
                        firstname: profile._json.name.split(/\s(.+)/)[0],
                        lastname: profile._json.name.split(/\s(.+)/)[1],
                        username: profile._json.email,
                        phonenumber: "",
                        password: "",
                        confirmpassword: "",
                     })
                     
                newUser.save()
            } else {
                return cb(null, user);
            }
        }  catch(err) {
        return cb(err);
        }
    })
 
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
   getAuthUser,
   getLogOut,
   authCheck,
   getUserProfile,
   postUpdateProfile
}