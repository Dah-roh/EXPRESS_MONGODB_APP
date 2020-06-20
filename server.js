const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const port = 3000;

app.listen(port, function() {
    console.log(`listening on ${port}`)
})

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
})