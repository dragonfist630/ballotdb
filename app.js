const mongose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const { path } = require("express/lib/application");
const app = express();
app.use(cors());

const Users = require("./model/userSchema");

//using dotenv to protect file creditinals
dotenv.config({path:"./config.env"});
require("./DB/conn");
const PORT = process.env.PORT;
//below is a middleware which can convert JSON into JS object
app.use(express.json());
//getting the router part
app.use(require("./router/auth"));



app.listen(PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

