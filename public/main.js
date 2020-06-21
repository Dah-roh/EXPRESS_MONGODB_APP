app.use(express.static("public"));
app.use(bodyParser.json());
// main.js
const update = document.querySelector("#update-button");

update.addEventListener("click", _ => {
  // Send PUT Request here
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Gadibs Daro",
      quote: "I find your lack of faith disturbing.",
    }),
  });
});

app.put("/quotes", (req, res) => {
    console.log(req.body);
    crudCollection
      .findOneAndUpdate(
        { name: "Gadibia Oghenetevwodaro" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => {
        /* ... */
        console.log(result)
      })
      .catch((error) => console.error(error));
  });
