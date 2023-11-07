const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html')
})

app.use((req, res) => {
    res.sendFile(__dirname + '/views/404.html')
})

app.listen(3000, ()=>{console.log('listening to server')})