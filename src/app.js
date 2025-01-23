// creating new web server

const express = require("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin" ,adminAuth );

app.get("/user/login" , (req,res,next) => {
    res.send("User login successfully");
})

app.get("/user/data" ,userAuth, (req,res,next) => {
    res.send("User data send ");
})

app.get("/admin/getAllData", (req,res) =>{
    // authorising the request
    res.send("All Data send");
    
});

app.get("/admin/deleteUser", (req,res) =>{
    // authorising the request
    res.send("Deleted a user");
   
});



//=>listening the server on the port

app.listen(4000, ()=>{
    console.log("server successfully started");
});