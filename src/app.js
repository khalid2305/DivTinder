const express=require('express')

const app=express()

const{adminAuth,userAuth}=require("./middlewares/auth")

const connectDB=require("./config/database")

const User=require("./Models/user");

const {validateSignUpData}=require("./utils/validation");

const bcrypt=require("bcrypt")

const cookieParser= require("cookie-parser")

const jwt=require("jsonwebtoken") 

app.use(express.json())

app.use(cookieParser())



app.post("/signup",async(req,res)=>{
  try{
    validateSignUpData(req);
    const {firstName,lastName,emailId,password}=req.body;
    const passwordHash= await bcrypt.hash(password,10);
    console.log(passwordHash);

    const user=new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    });

    await user.save()
    res.send("User Added Successfully")
  }
  catch(err){
    res.status(400).send("Error :"+err.message);
  }
})

app.post("/login",async (req,res)=>{
  try{
    const{emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
      throw new Error("Imvalid credentials");
    }
    const isPassword =await bcrypt.compare(password,user.password);
    if(isPassword){
      const token=await jwt.sign({_id: user._id},"Khalid@Lonewolf")
      console.log(token);
      res.cookie("token",token);
      res.send("login success");

    }else{
      throw new Error("Imvalid credentials");
    }
  }
  catch(err){
    res.status(400).send("Error : "+err.message);
  }
})


app.get("/profile",async(req,res)=>{

 try{
   const cookie=req.cookies;
   const{token}=cookie
   if(!token){
    throw new Error("Invalid token");
   }
   const decodedMessage=jwt.verify(token,"Khalid@Lonewolf")
   const {_id}=decodedMessage;

   const user=await User.findById(_id);
   if(!user){
    throw new Error("User not exist");
   }
   console.log("Logged in by the user is: "+_id)
   res.send(user);

  } 
  catch(err){
    res.status(400).send("err :"+err.message);
  }
  // console.log(decodedMessage)
  res.send(user);
})


app.post("/user",async(req,res)=>{
  const user=new User(req.body);
  try{
   await user.save();
   res.send("successfully stored the data");
  }
  catch(err){
    res.status(400).send("Error while saving the User:" + err.message);
  }
})

app.get("/user",async(req,res)=>{
const userfirstName=req.body.firstName
try{
const user=await User.find({firstName:userfirstName});
if(user.length==0){
  res.status(404).send("User not found");
}else{
res.send(user);
}
}
catch(err){
  res.status(400).send("Something went wrong")
}
})

app.get("/feed",async(req,res)=>{
  try{
  const user=await User.find();
  res.send(user)
  }
  catch(err){
    res.status(500).send("Error fetching users :"+err.message)
  }
})

app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  try{
  const user=await User.findByIdAndDelete(userId);
  if(user.length==0){
    res.status(404).send("User not found")
  }
  res.send("User deleted Successfully")
}
catch(err){
  res.status(400).send(err.message)
}
})

app.patch("/user/:userId",async(req,res)=>{
const userId=req.params.userId;
const body=req.body;
try{
const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];

const isUpdateAllowed=Object.keys(body).every((k)=>
  ALLOWED_UPDATES.includes(k)
);

if(!isUpdateAllowed){
  res.status(400).send("Update not allowed");
}

const user=await User.findByIdAndUpdate(userId,body,
  {returnDocument:"before",
   runValidators:true
  })
console.log(user);

res.send("Updated successfully")
}

catch(err){
  res.status(500).send("Error while updating")
}
})




connectDB()
.then(()=>{
  console.log("Database connection eshtablished...")
  app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777....")
  })
})
.catch((err)=>{
  console.log("Database cannot be connected!!");
})

//stroing data to DB-----------------------------------------------------------------------------


// app.post("/signup",async(req,res)=>{
//   const userObj={
//     firstName:"k",
//     lastName:"B",
//     email:"khalid@gmail.com",
//     password:"heartbroke",
//     age:20,
//     gender:"male",
//     _id:"507f1f77bcf86cd799439011"
//   }
//   const user=new User(userObj);
//   try{
//    await user.save();
//    res.send("successfully stored the data");
//   }
//   catch(err){
//     res.status(400).send("Error while saving the User:" + err.message);
//   }
   
// })



//Auth-----------------------------------------------------------------


// app.use("/admin",adminAuth);

// app.get(
//   "/admin/getdata",
//   (req,res)=>{
//     res.send("Got All data");
//   }
// )

// app.post(
//   "/user/login",
//   (req,res)=>{
//     res.send("Auth is not needed for login");
//   }
// )
// app.get(
//   "/user/data",
//   userAuth,
//   (req,res)=>{
//     res.send("Auth succesfull")
//   }
// )
// app.get(
//   "/admin/post",(req,res)=>{
//        res.send("postes");
//   }
// )

// app.listen(7777,()=>{
//     console.log("hi khalid i just now started to listen btw")
// })




//middleware------------------------------------------------------


// const middleware=(req,res,next)=>{
//   console.log("Checking admin auth...");
//   const token="xyz";
//   if(token!="xyz"){
//     return res.status(401).send("Unauthorized request");
//   }
//   next();
// }


// app.use(
//   "/",
//   (req,res,next)=>{
//   next();
// },(req,res,next)=>{
//     //  res.send("Hi da")
//     next()
//   });
// app.use(
//   "/use",
//   (req,res,next)=>{
//      console.log('Hi khalid 1')
//      next()
//   },
//   (req,res,next)=>{
//     console.log("Hi khalid 2")
//     next()
//   },
//   (req,res,next)=>{
//     console.log("khalid 3")
//     res.send("hi khalid 3")
//   }
// );
// app.listen(7777,()=>{
//     console.log("hi khalid i just now started to listen btw")
// })



//khalid be careful server is listening------------------------------------->




// app.listen(7777,()=>{
//     console.log("hi khalid i just now started to listen btw")
// })



//Query and params----------------------------------------------------------->




// app.get("/user",function(req,res){
//     console.log(req.query)
//     res.send({firstname:"khalid",lastname:"B"})
// })

// app.get("/user2/:userid/:name/:password",function(req,res){
//     console.log(req.params)
//     res.send({firstname:"khalid",lastname:"B"})
// })



//get,post,use-------------------------------------------------------------->



// app.get("/user",function(req,res){
//     console.log(req.query)
//     res.send({firstname:"khalid",lastname:"B"})
// })

// app.post("/user",function(req,res){
//     res.send("Successfully posted an api")
// })

// app.delete("/user",function(req,res){
//     res.send("Deleted successfully")
// })

// app.use("/Hello",function(req,res){
//    res.send("Hi macchi")
// })



//playing with routes------------------------------------------------------->




// app.get("/route",[rh1,rh2],rh3)

// app.get(
//     "/route",
//     [(req,res,next)=>{

//   console.log("rh1")
//     // res.send("from rh1")
//   next()
// //   res.send("from rh1")

// },(req,res,next)=>{

//   console.log("rh2")
//     res.send("from rh2")
//    next()

// }],(req,res,next)=>{
//   console.log("rh3")
// //   res.send("from rh3")
// // next()
// })


