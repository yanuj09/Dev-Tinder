// creating new web server

const express = require("express");

const app = express();


//app.use("/Route" , [RH1, RH2, RH3, RH4, RH5]);

app.use("/user", [(req,res,next) =>{
    console.log("handling the route user!");
    //res.send("Response1!");
    next();
}, (req,res,next) =>{
    console.log("handling route 2");
    //res.send("response2!");
    next();
}],(req,res,next) =>{
    console.log("handling route 3");
    //res.send("response3!");
    next();
},(req,res,next) =>{
    console.log("handling route 4");
    //res.send("response4!");
    next();
},(req,res,next) =>{
    console.log("handling route 5");
    //next();
    res.send("response5!");
    //next();
},)

// app.use("/getUserData" , (req,res)=>{
//     //fetching the user data
//     throw new Error("adfadfasd");
//     res.send("user Data send");
// });



//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});