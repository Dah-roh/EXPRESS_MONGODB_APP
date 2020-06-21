const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3000;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("crud_app");
    const crudCollection = db.collection("qoutes");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    // app.get('/', (req, res) => {

    // })
    app.listen(port, function () {
      console.log(`listening on ${port}`);
    });
    app.use(express.static('public'));
    app.set("view engine", "ejs");

    app.delete('/quotes', (req, res) => {
      crudCollection.deleteOne(
        { name: req.body.name }
      )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json(`Deleted One Quote!`)
      })
      .catch(error => console.error(error))
    })

    app.put("/quotes", (req, res) => {
      crudCollection.findOneAndUpdate(
        {name: ''},
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote
          }
        },
        {
          upsert: true
        }
      )
      .then(result => {
        console.log(result);
        res.json('Success!!')
      })
      .catch(error => console.error(error))
    });

    app.get("/", (req, res) => {
      crudCollection
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
          console.log(results);
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      crudCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
          console.log(result);
        })
        .catch((error) => console.error(error));
    });

  })
  .catch(console.error);

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

// Make sure you place body-parser before your CRUD handlers!
