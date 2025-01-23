// creating new web server

const express = require("express");

const app = express();


//app.use("/Route" , [RH1, RH2, RH3, RH4, RH5]);

// get/users => middleware => routes handler

app.use("/" , (req,res, next) =>{
    console.log("first middleware");
    next();
})

app.get("/user", [(req,res,next) =>{
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
},(req,res,next) =>{ // this function is a route handle rest every function is an middlware 
    console.log("handling route 5");
    //next();
    res.send("response5!");
    //next();
},)


/*
// another way of writing the above code
app.use("/user", (req,res,next) =>{
    console.log("handling the route user1!");
    //res.send("Response1!");
    next();
});

app.use("/user", (req,res,next) =>{
    console.log("handling the route user2!");
    //res.send("Response1!");
    next();
});

app.use("/user", (req,res,next) =>{
    console.log("handling the route user3!");
    res.send("Response3!");
    next();
});

*/

// app.use("/getUserData" , (req,res)=>{
//     //fetching the user data
//     throw new Error("adfadfasd");
//     res.send("user Data send");
// });



//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});