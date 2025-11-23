console.log("Did it")

const express=require('express')

const app=express()

app.get("/user",function(req,res){
    res.send({firstname:"khalid",lastname:"B"})
})

app.post("/user",function(req,res){
    console.log(req.body)
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



