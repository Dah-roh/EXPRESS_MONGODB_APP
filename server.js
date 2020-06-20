const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.listen(port, function() {
    console.log(`listening on ${port}`)
})

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })


app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.post('/quotes', (req, res) => {
    console.log('Hellooooooooooo!')
})