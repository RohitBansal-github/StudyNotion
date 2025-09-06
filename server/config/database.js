const mongoose=require("mongoose");
require("dotenv").config();
const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("Database is connected successfully.")})
    .catch((err)=>{
        console.log(err);
        console.log("Issue while connecting to database.");
        process.exit(1);
    })
}

module.exports=dbconnect;