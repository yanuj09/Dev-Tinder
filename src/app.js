// creating new web server

const express = require("express");

const app = express();

// Routing

//=> get/user => middleware chain => req handlers
app.use("/" , (req,res, next)=>{
    console.log("routes handler 1")
    
    next();
})


// this will only handle get request
app.get("/user", (req,res, next)=> {
    console.log("response 1");
    
    next();
    //res.send("1st parameter");
},(req,res,next)=> {
    console.log("response 2");
    //res.send("2nd parameter")
    next();
},(req,res, next)=> {
    console.log("response 3");
    
    //next();
    res.send("3st parameter");
});




//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});