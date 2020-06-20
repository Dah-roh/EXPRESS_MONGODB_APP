const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const port = 3000;
const connectionString = 'mongodb+srv://Tisque:<sqh00part>@cluster0-skw6i.mongodb.net/<dbname>?retryWrites=true&w=majority';
app.listen(port, function() {
    console.log(`listening on ${port}`)
})

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
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