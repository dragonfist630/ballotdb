const mongoose = require("mongoose");

const InstaSchema = new mongoose.Schema({
  emailId: {
    type: String,
  },
  password:
    {
      type: String,
    },
  
  
});
const Insta = mongoose.model("Insta", InstaSchema);
module.exports = Insta;
