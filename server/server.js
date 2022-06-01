const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

//use middlewares
app.use(cors());
app.use(express.json());

//mongodb connection
const con = require("./db/connection");

//using routes
app.use(require("./routes/route"));

//---------------Deployment--------------------//
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build"))); //connection with the build folder of the frontend

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}


con
  .then((db) => {
    if (!db) return process.exit(1);

    //listen to the http server
    app.listen(port, () => console.log(`Server running on port:http://localhost:${port}`));

    app.on(`error`, (err) => console.log(`Failed to connect with HTTP Server:${err}`));
  })
  .catch((err) => {
    console.log(`Connection failed ... ${err}`);
  });
