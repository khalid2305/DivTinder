const mongoose=require("mongoose");
var validator=require("validator")
const userSchema=new mongoose.Schema({
  
  firstName:{
    type:String,
    required:true,
    minLength:4,
    maxLength:50,
  },
  lastName:{
    type:String,
  },
  emailId:{
    type:String,
    lowercase:true,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Not a valid EmailId")
      }
    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("the password is not strong")
      }
    }
  },
  age:{
    type:Number,
    min:18
  },
  gender:{
    type:String,
    lowercase:true,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl:{
    type:String,
    default:"photourl.com",
    validata(value){
      if(!validator.isURL(value)){
        throw new Error("Not a valid url")
      }
    }
  },
  about:{
     type:String,
     default:"This is default about the user"
  },
  skills:{
   type:[String],
  }
}

,{timestamps:true,
});

const userModel=mongoose.model("User",userSchema);

module.exports=userModel;