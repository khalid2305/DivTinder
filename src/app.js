const express=require('express')

const app=express()
// app.get("/route",[rh1,rh2],rh3)

app.get(
    "/route",
    [(req,res,next)=>{
        
  console.log("rh1")
    // res.send("from rh1")
  next()
//   res.send("from rh1")

},(req,res,next)=>{

  console.log("rh2")
    // res.send("from rh2")
   next()

}],(req,res,next)=>{
  console.log("rh3")
  res.send("from rh3")
next()
})

// app.get("/user",function(req,res){
//     console.log(req.query)
//     res.send({firstname:"khalid",lastname:"B"})
// })

// app.get("/user2/:userid/:name/:password",function(req,res){
//     console.log(req.params)
//     res.send({firstname:"khalid",lastname:"B"})
// })

app.post("/user",function(req,res){
    res.send("Successfully posted an api")
})

app.delete("/user",function(req,res){
    res.send("Deleted successfully")
})

app.use("/Hello",function(req,res){
   res.send("Hi macchi")
})

app.listen(7777,()=>{
    console.log("hi khalid i just now started to listen btw")
})



