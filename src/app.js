const express=require('express')

const app=express()


app.use(
  "/",
  (req,res,next)=>{
  next();
},(req,res,next)=>{
    //  res.send("Hi da")
    next()
  });
app.use(
  "/use",
  (req,res,next)=>{
     console.log('Hi khalid 1')
     next()
  },
  (req,res,next)=>{
    console.log("Hi khalid 2")
    next()
  },
  (req,res,next)=>{
    console.log("khalid 3")
    res.send("hi khalid 3")
  }
);
app.listen(7777,()=>{
    console.log("hi khalid i just now started to listen btw")
})



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


