const mongoose = require("mongoose");
const bycrpyt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

//here implementing pre middleware which will run before save()
userSchema.pre('save', async function (next){
    console.log("hello from inside pre function");
    //isModified is a function which will pass true if the string passed inside it will be modified
    if(this.isModified('password')){
        this.password = await bycrpyt.hash(this.password, 12); // hash takes the variable v want to hash and number of rounds.
    }
    next();
});

const Users = mongoose.model('USER', userSchema);
module.exports = Users;