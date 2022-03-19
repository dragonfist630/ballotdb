const mongose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const { path } = require("express/lib/application");
const app = express();

//using dotenv to protect file creditinals
dotenv.config({path:"./config.env"});
const DB = process.env.DATABASE;

mongose.connect(DB, 
    { useNewUrlParser: true, 
    //   useCreateIndex: true, 
      useUnifiedTopology: true, 
    //   useFindAndModify: false, 
    })
  .then(() => {
    console.log("connection sucessful");
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/", (req, res) => {
  res.send("hello there!!!");
});
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
