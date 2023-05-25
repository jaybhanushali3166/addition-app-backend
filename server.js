const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 80;
const sum = require("./helper");
const { MongoClient, ServerApiVersion } = require("mongodb");
const config = require("./db.config");

const uri = `mongodb+srv://jaybhanushali3166:${
  config.dbPwd || process.env.dbPwd
}@cluster0.uvymo.mongodb.net/?retryWrites=true&w=majority`;
let client;

async function connectDB() {
  // Establish the connection only once
  if (!client) {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect(); // Connect the client to the server
  }
}
// parse application/json
app.use(bodyParser.json());
// Enable CORS
app.use(cors());

// APIs
app.post("/add", async (req, res) => {
  const { num1, num2 } = req.body;
  await connectDB(); // Ensure the database connection is established

  const database = client.db("sample");
  const sumAppDBCollection = database.collection("sumApp");
  const record = {
    results: {
      num1,
      num2,
      sum: sum(num1, num2),
    },
  };
  sumAppDBCollection.insertOne(record, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  res.status(200).json(record);
});

app.listen(PORT, () => {
  console.log("Server listening on:", PORT);
});
