// creating new web server

const express = require("express");

const app = express();

// Routing



// this will only handle get request
app.use("/user", [(req,res, next)=> {
    console.log("response 1");
    
    next();
    //res.send("1st parameter");
},(req,res,next)=> {
    console.log("response 2");
    //res.send("2nd parameter")
    next();
}],(req,res, next)=> {
    console.log("response 3");
    
    next();
    //res.send("3st parameter");
},(req,res, next)=> {
    console.log("response 4");
    
    next();
    //res.send("4st parameter");
},(req,res, next)=> {
    console.log("response 5");
    
    next();
    res.send("5st parameter");
});




//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});