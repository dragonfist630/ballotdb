const mongose = require("mongoose");



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

  