const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrpyt = require("bcryptjs");
const cors = require("cors");

require("../DB/conn.js");
const Usr = require("../model/userSchema.js");
const Query = require("../model/querySchema.js");
const { ObjectID } = require("bson");

router.get("/", cors(), (req, res) => {
  res.send("hello there!!!");
});

//for registration
router.post("/reg", cors(), async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName || !emailId || !password) {
    return res.status(422).json({ error: "Please fill all the details." });
  }
  const userExist = await Usr.findOne({ emailId: emailId });
  try {
    if (userExist) {
      return res.status(422).json({ error: "Email already exists." });
    }
    const unuser = new Usr({ firstName, lastName, emailId, password, queryName: [] });
    await unuser.save();
    res.status(201).json({ message: "User register successfully." });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", cors(), async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res.status(422).json({ error: "Please enter all the fields." });
  }
  const userDetails = await Usr.findOne({ emailId: emailId }); //finOne returns the whole object. console.log(userDetails);
  try {
    if (userDetails) {
      const isPasswordMatch = await bcrpyt.compare(password, userDetails.password);
      if (isPasswordMatch) {
        return res.status(201).json([userDetails.id, userDetails.firstName, userDetails.lastName, userDetails.queryName]);
      } else {
        return res.status(422).json({ error: "Invalid credintials" });
      }
    }
    res.status(422).json({ error: "Invalid credintials" });
  } catch (err) {
    console.log(err);
  }
});

//forgotpass.js
router.post("/resetpass", cors(), async (req, res) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    return res.status(422).json({ error: "Provide all details" });
  }
  try {
    const emailExists = await Usr.findOne({ emailId: emailId });
    if (emailExists) {
      emailExists.password = password;
      emailExists.save();
      return res.status(201).json({ message: "Password reset successfully." });
    }
    res.status(422).json({ error: "User doesn't exists." });
  } catch (error) {
    console.log(error);
  }
});

//Createquery.js
router.post("/querys", cors(), async (req, res) => {
  const { queryName, optionName, value, totalVotes } = req.body;
  const queryDetails = await Query.findOne({ queryName: queryName });
  try {
    if (queryDetails) {
      return res.status(422).json({ error: "This query already exist." });
    }
    const qry = new Query({ queryName, optionName, value, totalVotes });
    await qry.save();
    res.status(201).json({ message: "This query added successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/voteQueries", cors(), async (req, res) => {
  const { userId, queryName, optionName } = req.body;
  if (!userId || !queryName) {
    return res.status(422).json({ error: "Please provide details" });
  }
  try {
    const userExists = await Usr.findOne({ _id: userId });
    const querExists = await Query.findOne({ _id: queryName });
    if (userExists) {      
      userExists.queryName.push(queryName);
      userExists.save();
      querExists.optionName.map((currElem, index) => {
        if (currElem === optionName) {
          querExists.value[index] = querExists.value[index] + 1;
        }
      });
      querExists.totalVotes=querExists.totalVotes+1;
      querExists.save();
      return res.status(201).json({ message: "Vote Uploaded." });
    } else {
      res.status(422).json({ error: "User Doesn't exists." });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/getvotedquery", cors(), async (req, res) => {
  var {myId} = req.body; 
  // console.log(myId); 
  if(!myId){
    return res.status(422).json({error:"Please provide all details."});
  }
  try {
    const temp = await Usr.findOne({ _id: myId });
    if(temp){
      return res.status(201).json(temp.queryName);
    }
    res.status(422).json({error:"User doesn't exist."});
  } catch (error) {
    console.log(error);
  }
});

router.get("/getquery", cors(), async (req,res)=>{
  const query = await Query.find();
  try{
    res.status(201).json(query);
  }catch(error){
    console.log(error);
  }
});

module.exports = router;