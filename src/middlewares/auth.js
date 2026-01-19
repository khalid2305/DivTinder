const User=require("../Models/user")
const jwt=require("jsonwebtoken")

const adminAuth=(req,res,next)=>{
    console.log("Checking admin auth...");
  const token="xyz";
  if(token!="xyz"){
    return res.status(401).send("Unauthorized request");
  }
  next();
}
const Auth=(req,res,next)=>{
     console.log("Checking user auth...");
  const token="xyz";
  if(token!="xyz"){
    return res.status(401).send("Unauthorized request");
  }
  next();
}

const userAuth=async(req,res,next)=>{
    try{
      const {token}=req.cookies;
        if(!token){
          throw new Error("token not valid")
        }
      const decodedJwt=jwt.verify(token,"Khalid@Lonewolf")
      const{_id}=decodedJwt;
      const user=await User.findById(_id);
        if(!user){
          throw new Error("user not found")
        }
      req.user=user;
      next();
  }catch(err){
    res.status(400).send("Error :"+err.message);
  }
}


module.exports={
Auth,
adminAuth,
userAuth
}