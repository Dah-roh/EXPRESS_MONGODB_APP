app.use(express.static("public"));
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


