const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/users')

const app = express();

const dbURI = "mongodb+srv://testUser1:zTm{2023}@nodetutorial.acvyz82.mongodb.net/nodeTutorial?retryWrites=true&w=majority"

mongoose.connect(dbURI)
    .then((result) => { app.listen(3000, () => {console.log('listening to server & connected to db')})})
    .catch((err) => {console.error(err)})

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/users', (req, res) => {
    const newUser = new User ({
        name: "Harmon Tuazon",
        email: "iamthedevt@fakemail.com",
        password: "test12341234"
    })

    newUser.save()
        .then((result) => {res.send(result)})
        .catch((err) => {console.error(err)})
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.use((req, res) => {
    res.sendFile(__dirname + '/views/404.html')
})

