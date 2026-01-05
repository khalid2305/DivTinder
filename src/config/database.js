const mongoose = require("mongoose");


const connectDB = async () => {
  await mongoose.connect("mongodb+srv://khalid:YiWhJFkwRjZ1vJIx@cluster1.omzyctv.mongodb.net/devTinder")
};


module.exports=connectDB;