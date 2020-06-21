const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const port = 3000;
const connectionString =
  "mongodb+srv://Tisque:sqh00part@cluster0-skw6i.mongodb.net/crud_app?retryWrites=true&w=majority";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("crud_app");
    const crudCollection = db.collection("qoutes");
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.get('/', (req, res) => {

    // })
    app.listen(port, function () {
      console.log(`listening on ${port}`);
    });

    app.set("view engine", "ejs");

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
