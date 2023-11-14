const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users');
const Blog = require('./models/blogs');

const app = express();

app.set('view engine', 'ejs')

const dbURI = "mongodb+srv://testUser1:zTm{2023}@nodetutorial.acvyz82.mongodb.net/nodeTutorial?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then((result) => { app.listen(3000, () => {console.log('listening to server & connected to db')})})
    .catch((err) => {console.error(err)})

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));


// home & about
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})


// for users

app.get('/users', (req, res) => {
    User.find()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)})
})

app.post('/users', (req, res) => {
    const newUser = new User(req.body)

    newUser.save()
    .then((result) => {res.redirect('/users')})
    .catch((err) => {console.error(err)}) 
})

// for blogs
app.get('/blogs', (req, res) => {
    Blog.find()
    .then((result) => {res.render('blogs', { blogs: result })})
    .catch((err) => {console.error(err)})
})

app.get('/blogs/create-blog', (req, res) => {
    res.render('createBlog')
})

app.post('/blogs', (req, res) => {
    const newBlog = new Blog(req.body)

    newBlog.save()
    .then((result) => {res.redirect('/blogs')})
    .catch((err) => {console.error(err)}) 
})


// 404 Error Handling
app.use((req, res) => {
    res.render('404')
})

