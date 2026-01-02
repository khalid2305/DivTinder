const adminAuth=(req,res,next)=>{
    console.log("Checking admin auth...");
  const token="xyz";
  if(token!="xyz"){
    return res.status(401).send("Unauthorized request");
  }
  next();
}
const userAuth=(req,res,next)=>{
     console.log("Checking user auth...");
  const token="xyz";
  if(token!="xyz"){
    return res.status(401).send("Unauthorized request");
  }
  next();
}

module.exports={
adminAuth,
userAuth
}