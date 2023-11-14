const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes.js')
const userRouter = require('./routes/userRoutes.js')

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
app.use('/users', userRouter)

// for blogs
app.use('/blogs', blogRouter)


// 404 Error Handling
app.use((req, res) => {
    res.render('404')
})

