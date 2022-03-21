const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  queryName: {
    type: String,
    required: true
  },
  optionName: [
    {
      type: String,
      required: true
    },
  ],
  value: [
    {
      type: Number,
      required: true
    },
  ],
  totalVotes:{
      type:Number,
      required:true
  }
  
});
const Query = mongoose.model("QUERY", querySchema);
module.exports = Query;
