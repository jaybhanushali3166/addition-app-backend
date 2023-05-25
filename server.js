const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 80;
// parse application/json
app.use(bodyParser.json());

app.post("/add", (req, res) => {
  console.log("Hello");
  const { num1, num2 } = req.body;
  console.log("numers", num1, num2);
  res.status(200).json({ sum: num1 + num2 });
});

app.listen(PORT, () => {
  console.log("Server listening on:", PORT);
});
