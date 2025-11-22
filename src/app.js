console.log("Did it")

const express=require('express')

const app=express()

app.use("/Hello",function(req,res){
   res.send("Hi macchi")
})

app.listen(7777,()=>{
    console.log("hi khalid i just now started to listen btw")
})



