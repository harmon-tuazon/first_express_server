const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const blogRouter = require('./routes/blogRoutes.js')
const userRouter = require('./routes/userRoutes.js')
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs')

const dbURI = process.env.MONGO_DB

mongoose.connect(dbURI)
    .then((result) => { app.listen(3000, () => {console.log('listening to server & connected to db')})})
    .catch((err) => {console.error(err)})

    

app.use(session({ secret: "mysecret", resave: false, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// home & about
app.get('/', (req, res) => {
    res.render('index', { title: "Home Page", user: req.user})
})

app.get('/about', (req, res) => {
    res.render('about', { title: "About Us" })
})

// for users
app.use('/users', userRouter)

// for blogs
app.use('/blogs', blogRouter)


// 404 Error Handling
app.use((req, res) => {
    res.render('404', { title: "Could Not Find Page" })
})

